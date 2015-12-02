import $ from 'jquery';
export function initialize(/* container, application */) {
	
	const stack = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	let currentStack = stack.slice();

	$(window).on('keyup.coin-clicks', event => {
		const keyCode = currentStack.shift();

		if (event.keyCode === keyCode) {
			if (currentStack.length === 0) {
				$(window).on('click.coin-clicks', addCoin);
				$(window).off('keyup.coin-clicks');
			}
		} else {
			currentStack = stack.slice();
		}
	});
	
}

export default {
  name: 'coin-clicks',
  initialize: initialize
};

let coinCount = 0;

function addCoin(event) {
	coinCount++;
	if (coinCount >= 10) {
		$(window).off('click.coin-clicks');
		initialize();
		coinCount = 0;
	}
	const $img = $('<img>')
		.attr('src', '/coin-clicks/img/coin.gif')
		.css({
			position: 'absolute',
			left: `${event.pageX}px`,
			top: `${event.pageY}px`,
			zIndex: 100000
		})
		.appendTo(document.body);

	const $audio = $('<audio>')
		.attr('src', '/coin-clicks/sounds/coin.wav')
		.attr('autoplay', true)
		.appendTo(document.body);

	setTimeout(() => {
		$img.fadeOut(100);
		$audio.remove();
	}, 500);
}