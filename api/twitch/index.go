package twitch

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/nicklaw5/helix/v2"
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
	channelURLPrefix = "https://www.twitch.tv/"
)

func TwitchStatusHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string, username string) {
	client, err := helix.NewClient(&helix.Options{
		ClientID:     clientID,
		ClientSecret: clientSecret,
	})
	if err != nil {
		panic(err)
	}

	resp, err := client.RequestAppAccessToken([]string{"user:read:email"})
	if err != nil {
		panic(err)
	}

	client.SetAppAccessToken(resp.Data.AccessToken)

	users, err := client.GetUsers(&helix.UsersParams{
		Logins: []string{username},
	})
	if err != nil {
		panic(err)
	}

	if len(users.Data.Users) < 1 {
		panic("no user found for username")
	}

	output := Output{}

	output.ChannelName = users.Data.Users[0].DisplayName
	output.ChannelURL = channelURLPrefix + users.Data.Users[0].DisplayName

	followerInfo, err := client.GetUsersFollows(&helix.UsersFollowsParams{
		ToID: users.Data.Users[0].ID,
	})
	if err != nil {
		panic(err)
	}

	output.ChannelSubscriberCount = followerInfo.Data.Total

	streams, err := client.GetStreams(&helix.StreamsParams{
		UserIDs: []string{users.Data.Users[0].ID},
	})
	if err != nil {
		panic(err)
	}

	output.StreamIsLive = false
	if len(streams.Data.Streams) > 0 {
		output.StreamIsLive = true

		details := streams.Data.Streams[0]

		output.StreamName = details.Title
		output.StreamViewerCount = details.ViewerCount
	} else {
		videos, err := client.GetChannelInformation(&helix.GetChannelInformationParams{
			BroadcasterID: users.Data.Users[0].ID,
		})
		if err != nil {
			panic(err)
		}

		if len(videos.Data.Channels) > 0 {
			output.StreamName = videos.Data.Channels[0].Title
		}
	}

	output.StreamURL = output.ChannelURL // On Twitch, ChannelURL = StreamURL

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	TwitchStatusHandler(w, r, os.Getenv("TWITCH_CLIENT_ID"), os.Getenv("TWITCH_CLIENT_SECRET"), os.Getenv("TWITCH_USERNAME"))
}
