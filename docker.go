package main

import (
	"fmt"
	"github.com/fsouza/go-dockerclient"
)

var (
	endpoint  = "unix:///var/run/docker.sock"
	client, _ = docker.NewClient(endpoint)
)

//func dockerCommit() {
func main() {
	img, err := client.CommitContainer(docker.CommitContainerOptions{Container: "ffc4dfc4827c"})
	fmt.Println(img)
	if err != nil {
		fmt.Println(err)
		return
	}
	err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "ffc4dfc4827c"})
}

func deleteImageAPI(id string) {

}
