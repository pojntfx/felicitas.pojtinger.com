package youtube

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

type Output struct {
	ChannelName            string `json:"channelName"`
	ChannelSubscriberCount int    `json:"channelSubscriberCount"`
	ChannelURL             string `json:"channelURL"`
	StreamIsLive           bool   `json:"streamIsLive"`
	StreamName             string `json:"streamName"`
	StreamViewerCount      int    `json:"streamViewerCount"`
	StreamURL              string `json:"streamURL"`
}

const (
	channelURLPrefix = "https://www.youtube.com/channel/"
	videoURLPrefix   = "https://www.youtube.com/watch?v="
)

func YouTubeHandler(w http.ResponseWriter, r *http.Request, token string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username (which is the channel ID) query parameter: "))

		panic("missing username (which is the channel ID) query parameter")
	}

	client, err := youtube.NewService(r.Context(), option.WithAPIKey(token))
	if err != nil {
		panic(err)
	}

	channels, err := client.Channels.List([]string{"statistics", "snippet"}).Id(username).Do()
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
		output.ChannelURL = channelURLPrefix + channels.Items[0].Id
	}

	statistics := channels.Items[0].Statistics
	if statistics != nil {
		output.ChannelSubscriberCount = int(statistics.SubscriberCount)
	}

	videos, err := client.Search.List([]string{"id"}).ChannelId(username).Type("video").EventType("live").Order("date").Do()
	if err != nil {
		panic(err)
	}

	output.StreamIsLive = true
	if len(videos.Items) < 1 {
		output.StreamIsLive = false

		videos, err = client.Search.List([]string{"id"}).ChannelId(username).Type("video").EventType("completed").Order("date").Do()
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
				output.StreamURL = videoURLPrefix + video.Id.VideoId
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

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	YouTubeHandler(w, r, os.Getenv("YOUTUBE_TOKEN"))
}
