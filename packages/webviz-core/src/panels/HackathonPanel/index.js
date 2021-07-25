// @flow
//
//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import cx from "classnames";
import React, { useMemo, useCallback } from "react";
import { hot } from "react-hot-loader/root";
import Button from "webviz-core/src/components/Button";
import helpContent from "./index.help.md";
import styled from "styled-components";

import PanelToolbar from "webviz-core/src/components/PanelToolbar";

import CameraIcon from "@mdi/svg/svg/camera.svg";
import Flex from "webviz-core/src/components/Flex";
import Icon from "webviz-core/src/components/Icon";
import Panel from "webviz-core/src/components/Panel";
import { getGlobalHooks } from "webviz-core/src/loadWebviz";
import styles from './HackathonPanel.module.scss';

export const ShootButton = styled(Button)`
  color: green;
`;


import "roslib/build/roslib";

const ROSLIB = window.ROSLIB;

var ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090' // url to your rosbridge server
});

//* A topic for messaging.
var shootTopic = new ROSLIB.Topic({
  ros: ros,
  name: '/shoot', // use a sensible namespace
  messageType: 'std_msgs/String'
});

/**
 * Serializes an object and publishes it to a std_msgs/String topic.
 * @param {ROSLIB.Topic} topic
 *       A topic to publish to. Must use messageType: std_msgs/String
 * @param {Object} obj
 *       Any object that can be serialized with JSON.stringify
 */
function publishEncoded(topic, obj) {
  var msg = new ROSLIB.Message({
    data: JSON.stringify(obj)
  });
  topic.publish(msg);
}

function HackathonPanel(props: Props) {

  const toolbar = useMemo(() => {
    return (
      <PanelToolbar floating helpContent={helpContent}>
        {/* <div className={style.controls}>
          {imageTopicDropdown}
          {markerDropdown}
        </div> */}
      </PanelToolbar>
    );
  });

  return (
    <Flex col className={styles.panel}>
      <PanelToolbar floating helpContent={helpContent} menuContent={<></>}>
        {/* <div className={style.controls}>
          {imageTopicDropdown}
          {markerDropdown}
        </div> */}
      </PanelToolbar>
      <Flex col center fixed="10%">
        <Flex row>
          <ShootButton
            onClick={() => publishEncoded(shootTopic, { time: Date.now() })}
            style={{ borderRadius: "0px 4px 4px 0px" }}>
            <Icon medium tooltip="Capture">
              <CameraIcon />
            </Icon>
          </ShootButton>
          {/* <ShootButton
            // onClick={() => jumpSeek(DIRECTION.FORWARD, { seek, player: playerState.current })}
            style={{ borderRadius: "0px 4px 4px 0px" }}>
            <Icon medium tooltip="Seek forward">
              <CameraIcon />
            </Icon>
          </ShootButton> */}
        </Flex>
      </Flex>
    </Flex >
  );
}

HackathonPanel.panelType = "HackathonPanel";
// HackathonPanel.defaultConfig = getGlobalHooks().perPanelHooks().HackathonPanel.defaultConfig;
HackathonPanel.shortcuts = [{ description: "SHOOT", keys: [" "] }];
export default hot(Panel < Config > (HackathonPanel));
