import Quill from 'quill';
const BlockEmbed = Quill.import('blots/block/embed');
class VideoBlot extends BlockEmbed {
static create(value) {
	const node = super.create();
	node.setAttribute('src', value.url);
	node.setAttribute('controls', value.controls);
	node.setAttribute('width', value.width);
	node.setAttribute('height', value.height);
	node.setAttribute('webkit-playsinline', true);
	node.setAttribute('playsinline', true);
	node.setAttribute('x5-playsinline', true);
	return node;
}
static value(node) {
	return {
		url: node.getAttribute('src'),
		controls: node.getAttribute('controls'),
		width: node.getAttribute('width'),
		height: node.getAttribute('height'),
	};
}
}
VideoBlot.blotName = 'simpleVideo';
VideoBlot.tagName = 'video';
export default VideoBlot;
