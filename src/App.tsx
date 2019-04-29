import * as React from 'react';
import Documentation from '@open-rpc/docs-react';

interface Props {}
interface State {
  schema: any;
}

class App extends React.Component<Props, State> {
  state: State = {
    schema: {},
  };

  constructor(props: Props) {
    super(props);

    window.addEventListener('message', ({ data }) => {
      this.setState({ schema: data });
    });
  }

  render() {
    return (
      <Documentation schema={this.state.schema} />
    );
  }
}

export default App;
