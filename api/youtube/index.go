package youtube

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

type Output struct {
	ChannelName            string `json:"channelName"`
	ChannelSubscriberCount int    `json:"channelSubscriberCount"`
	StreamName             string `json:"streamName"`
	StreamIsLive           bool   `json:"streamIsLive"`
	StreamViewerCount      int    `json:"streamViewerCount"`
}

func YouTubeHandler(w http.ResponseWriter, r *http.Request, token string, channelID string, ttl int) {
	client, err := youtube.NewService(r.Context(), option.WithAPIKey(token))
	if err != nil {
		panic(err)
	}

	channels, err := client.Channels.List([]string{"statistics", "snippet"}).Id(channelID).Do()
	if err != nil {
		panic(err)
	}

	if len(channels.Items) < 1 {
		panic("no channels found for channel ID")
	}

	output := Output{}

	snippet := channels.Items[0].Snippet
	if snippet != nil {
		output.ChannelName = snippet.Title
	}

	statistics := channels.Items[0].Statistics
	if statistics != nil {
		output.ChannelSubscriberCount = int(statistics.SubscriberCount)
	}

	videos, err := client.Search.List([]string{"id"}).ChannelId(channelID).Type("video").EventType("live").Order("date").Do()
	if err != nil {
		panic(err)
	}

	output.StreamIsLive = true
	if len(videos.Items) < 1 {
		output.StreamIsLive = false

		videos, err = client.Search.List([]string{"id"}).ChannelId(channelID).Type("video").EventType("completed").Order("date").Do()
		if err != nil {
			panic(err)
		}
	}

	for _, video := range videos.Items {
		details, err := client.Videos.List([]string{"snippet", "liveStreamingDetails"}).Id(video.Id.VideoId).Do()
		if err != nil {
			panic(err)
		}

		if len(details.Items) > 0 {
			snippet := details.Items[0].Snippet
			if snippet != nil {
				output.StreamName = snippet.Title
			}

			if output.StreamIsLive {
				liveStreamingDetails := details.Items[0].LiveStreamingDetails
				if liveStreamingDetails != nil {
					output.StreamViewerCount = int(liveStreamingDetails.ConcurrentViewers)
				}
			}

			break
		}
	}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	w.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", ttl))

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ttl := 900
	if rawTTL := os.Getenv("YOUTUBE_TTL"); rawTTL != "" {
		parsedTTL, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		ttl = parsedTTL
	}

	YouTubeHandler(w, r, os.Getenv("YOUTUBE_TOKEN"), os.Getenv("YOUTUBE_CHANNEL_ID"), ttl)
}