import React from "react";
import Inspector from "@open-rpc/inspector";
import { Grid } from "@material-ui/core";
import { IMethodPluginProps } from "@open-rpc/docs-react/build/Methods/Methods";
import { ExamplePairingObject, ExampleObject } from "@open-rpc/meta-schema";

const InspectorPlugin: React.FC<IMethodPluginProps> = (props) => {
  const method = props.openrpcMethodObject;
  const examplePosition = 0;
  let example;
  let exampleParams;
  if (method && method.examples && method.examples[examplePosition]) {
    example = method.examples[examplePosition] as ExamplePairingObject;
    exampleParams = (example.params as ExampleObject[]).map((p) => p.value);
  }
  return (
    <Grid style={{ height: "200px", width: "100%", overflow: "hidden" }}>
      <Inspector
        request={{ method: method.name, params: exampleParams || [] }}
        openrpcMethodObject={method}
        hideToggleTheme={true}
      />
    </Grid>
  );
};

export default InspectorPlugin;
