package main

import (
	"fmt"
	"github.com/fsouza/go-dockerclient"
)

var (
	endpoint  = "unix:///var/run/docker.sock"
	client, _ = docker.NewClient(endpoint)
)

func main() {
	img, err := client.CommitContainer(docker.CommitContainerOptions{container: "ffc4dfc4827c"})
	fmt.Println(img)
	fmt.Println(err)
}

func deleteImageAPI(id string) {

}
