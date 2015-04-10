package main

import (
	"encoding/json"
	//	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/fsouza/go-dockerclient"
)

var (
	endpoint  = "unix:///var/run/docker.sock"
	client, _ = docker.NewClient(endpoint)
)

type DockerImageID struct {
	ID string
}

func (c CRImage) dockerCommit() error {
	//func main() {
	//req, err := http.NewRequest("GET", c.getURL(path), params)
	resp, err := http.Get("http://localhost:8080/containers/" + strconv.FormatInt(c.UserId, 10))
	if err != nil {
		//		fmt.Println(err)
		logger.Warnf("error getting container id: %s", err)
		return err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logger.Warnf("error reading http body: %s", err)
		//		fmt.Println(err)
		return err
	}
	var di DockerImageID
	if err = json.Unmarshal(body, &di); err != nil {
		logger.Warnf("error decoding container id: %s", err)
		return err
	}
	//	if err = client.PauseContainer(di.ID); err != nil {
	//		logger.Warnf("error stopping container: %s", err)
	//		return err
	//	}
	//	if err = client.StopContainer(di.ID, 5); err != nil {
	//		logger.Warnf("error stopping container: %s", err)
	//		return err
	//	}

	commitOpts := docker.CommitContainerOptions{Container: di.ID, Repository: c.ImageName, Tag: strconv.Itoa(c.Tag)}
	if _, err := client.CommitContainer(commitOpts); err != nil {
		logger.Warnf("error committing container: %s", err)
		return err
	}
	if err = client.TagImage(c.ImageName, docker.TagImageOptions{Repo: "127.0.0.1:5000", Tag: strconv.Itoa(c.Tag), Force: true}); err != nil {
		logger.Warnf("error tagging container: %s", err)
		return err
	}
	if err = client.RemoveContainer(docker.RemoveContainerOptions{ID: di.ID, Force: true}); err != nil {
		logger.Warnf("error removing container: %s", err)
		return err
	}
	return nil
	//	err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "ffc4dfc4827c"})
}

func (c CRImage) dockerPush() error {
	opts := docker.PushImageOptions{Name: c.ImageName, Tag: strconv.Itoa(c.Tag), Registry: "127.0.0.1:5000"}
	var auth docker.AuthConfiguration
	if err := client.PushImage(opts, auth); err != nil {
		logger.Warnf("error removing container: %s", err)
		return err
	}
	return nil
}

//func dockerDelete(id string) {
//	if err := client.CommitContainer(commitOpts); err != nil {
//		fmt.Println(err)
//		return err
//	}
//}
