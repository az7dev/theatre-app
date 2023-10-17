import Application from '@/core/Application'
import RemoteComponents from '@/core/remote/RemoteComponents'
import RemoteTheatre from '@/core/remote/RemoteTheatre'
import RemoteTweakpane from '@/core/remote/RemoteTweakpane'

export const IS_DEV = import.meta.env.DEV
// export const app = new Application('Hermes', IS_DEV, 'editor')

class CustomApp extends Application {
  constructor(name: string, debugEnabled: boolean, editorHashtag: string) {
    super(name, debugEnabled, editorHashtag)

    // Add components
    this.addComponent('theatre', new RemoteTheatre(this, 'RemoteApp'))

    if (IS_DEV) {
      this.addComponent('components', new RemoteComponents(this))
      this.addComponent('debug', new RemoteTweakpane(this))
    }
  }

  // Components

  get debug(): RemoteTweakpane {
    return this.components.get('debug') as RemoteTweakpane
  }

  get debugComponents(): RemoteComponents {
    return this.components.get('components') as RemoteComponents
  }

  get theatre(): RemoteTheatre {
    return this.components.get('theatre') as RemoteTheatre
  }
}

export const app = new CustomApp('Hermes', IS_DEV, 'editor')
