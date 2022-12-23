
import { ToastContainer, toast } from 'react-toastify'
import ForceGraph2D from 'react-force-graph-2d';
import './App.css';
import React from 'react';

function Canvas({data, dim}) {
	const {width,height} = dim
	return (<ForceGraph2D
		graphData={data}
		linkWidth={1}
		height={height}
		width={width}
		nodeColor="color"
		enableNodeDrag
		


	/>);
}

export default Canvas;
