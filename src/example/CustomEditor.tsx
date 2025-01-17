import React, { useEffect, useState } from 'react';
import { Events, app, threeDispatcher } from './constants';
import Editor from '../editor/Editor';
import Dropdown from '../editor/components/Dropdown';
import SidePanel from '../editor/sidePanel/SidePanel';
import MultiView from '../editor/multiView/MultiView';
// Scenes
import BaseScene from './three/BaseScene';
import Scene1 from './three/Scene1';
import Scene2 from './three/Scene2';

// Referenced Scenes
const scenes: Map<string, any> = new Map();
scenes.set('Scene1', Scene1);
scenes.set('Scene2', Scene2);

export default function CustomEditor() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onLoad = () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
      setLoaded(true);
    };
    threeDispatcher.addEventListener(Events.LOAD_COMPLETE, onLoad);
    return () => {
      threeDispatcher.removeEventListener(Events.LOAD_COMPLETE, onLoad);
    };
  }, []);

  return (
    <Editor
      header={[
        <Dropdown
          title='Scenes'
          key='Scenes'
          options={[
            {
              type: 'option',
              title: 'Scene 1',
              value: 'scene1',
            },
            {
              type: 'option',
              title: 'Scene 2',
              value: 'scene2',
            },
          ]}
          onSelect={(value: string) => {
            app.send({
              target: 'app',
              event: 'selectComponent',
              data: {
                dropdown: 'Scenes',
                value,
              },
            });
          }}
        />
      ]}>
        <>
        {loaded && (
          <>
            <MultiView
              three={app.three}
              scenes={scenes}
              onSceneUpdate={(scene: any) => {
                // Custom callback for animation updates
                const baseScene = scene as BaseScene;
                baseScene.update();
              }}
            />
            <SidePanel three={app.three} />
          </>
        )}
        </>
      </Editor>
  );
}
