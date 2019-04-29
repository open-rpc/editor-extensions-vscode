import * as React from 'react';

interface Props {}
interface State {
  schema: any;
}

class App extends React.Component<Props, State> {
  state: State = {
    schema: undefined,
  };

  constructor(props: Props) {
    super(props);

    window.addEventListener('message', ({ data }) => {
      this.setState({ schema: data });
    });
  }

  render() {
    return (
      <>
        <h1>Schema</h1>
        {JSON.stringify(this.state.schema)}
      </>
    );
  }
}

export default App;
