import React, { useEffect } from 'react';
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
// import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
// import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
// import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
// import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
// import SearchPlugin from 'simple-mind-map/src/plugins/Search.js'
// import Painter from 'simple-mind-map/src/plugins/Painter.js'
// import ScrollbarPlugin from 'simple-mind-map/src/plugins/Scrollbar.js'
// import Formula from 'simple-mind-map/src/plugins/Formula.js'
// import Cooperate from 'simple-mind-map/src/plugins/Cooperate.js'

export default function SimpleMind() {
  MindMap.usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(ExportPDF)
  // .usePlugin(ExportXMind) // 有问题 需要stream依懒
  .usePlugin(Export)
  .usePlugin(Select)
  // .usePlugin(AssociativeLine)
  // .usePlugin(NodeImgAdjust)
  // .usePlugin(TouchEvent)
  // .usePlugin(SearchPlugin)
  // .usePlugin(Painter)
  // .usePlugin(Formula)
  // .usePlugin(ScrollbarPlugin)
  // .usePlugin(Cooperate)
  .usePlugin(RichText)

  
  useEffect(() => {
    new MindMap({
      el: document.getElementById('mindMapContainer'),
      data: {
        "data": {
            "text": "根节点"
        },
        "children": []
      }
    })
  }, []);
 
  return (
    <div id="mindMapContainer" style={{ width: '100vw', height: '100vh' }}></div>
  );
}

export { SimpleMind };
