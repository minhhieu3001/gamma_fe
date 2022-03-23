import Builder from 'xmlbuilder';

export const XMLGenerator = (model, parameterList = [], outputList = []) => {
  const parameters = parameterList.map((item) => ({
    Parameter: {
      '@name': item?.name,
      '@type': item?.type,
      '@value': item?.value,
    },
  }));
  const outputs = outputList.map((item) => ({
    Output: {
      '@id': item?.id,
      '@name': item?.name,
      '@framerate': item?.framerate,
    },
  }));
  const obj = {
    Experiment_plan: {
      Simulation: {
        '@id': model?.id,
        '@sourcePath': model?.sourcePath,
        '@finalStep': model?.finalStep,
        '@until': model?.until,
        '@experiment': model?.experiment,
        Parameters: parameters,
        Outputs: outputs,
      },
    },
  };
  var xml = Builder.create(obj, { version: '1.0', encoding: 'UTF-8' }).end({
    pretty: true,
  });

  return xml;
};
