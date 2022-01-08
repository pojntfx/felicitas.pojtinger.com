package twitch

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/nicklaw5/helix/v2"
)

func TwitchStatusHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string, username string, ttl int) {
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
		panic("no user found")
	}

	info, err := client.GetChannelInformation(&helix.GetChannelInformationParams{
		BroadcasterID: users.Data.Users[0].ID,
	})
	if err != nil {
		panic(err)
	}

	j, err := json.Marshal(info)
	if err != nil {
		panic(err)
	}

	w.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", ttl))

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ttl := 900
	if rawTTL := os.Getenv("TWITCH_TTL"); rawTTL != "" {
		parsedTTL, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		ttl = parsedTTL
	}

	TwitchStatusHandler(w, r, os.Getenv("TWITCH_CLIENT_ID"), os.Getenv("TWITCH_CLIENT_SECRET"), os.Getenv("TWITCH_USERNAME"), ttl)
}
