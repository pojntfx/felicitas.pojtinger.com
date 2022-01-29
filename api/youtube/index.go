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
	Subscribers int `json:"subscribers"`
}

func YouTubeHandler(w http.ResponseWriter, r *http.Request, token string, channelID string, ttl int) {
	client, err := youtube.NewService(r.Context(), option.WithAPIKey(token))
	if err != nil {
		panic(err)
	}

	channels, err := client.Channels.List([]string{"statistics"}).Id(channelID).Do()
	if err != nil {
		panic(err)
	}

	if len(channels.Items) < 1 {
		panic("no channels found for channel ID")
	}

	output := Output{
		Subscribers: int(channels.Items[0].Statistics.SubscriberCount),
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
