import React from "react";
import { DefaultDraftBlockRenderMap } from "draft-js";
import { Map } from "immutable";

import AtomicBlockWrapper from "./../components/question-fields/atomic-block-wrapper";

const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  Map({
    'atomic': {
      element: 'div',
      wrapper: <AtomicBlockWrapper />
    }
  })
);

export default blockRenderMap;
