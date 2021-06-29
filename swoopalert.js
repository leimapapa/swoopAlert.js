const swoop = (function (jQ) {
	let popupDisplayed = false;
	return {
		swoopAlert: function (
			popupMessage = "&nbsp;",
			popupMS = 3000,
			swoopColor = "#000",
			swoopTextColor = "#fff"
		) {
			//wrap everything to avoid double-tap strangeness
			if (!popupDisplayed) {
				$("body").append('<div class="svgArea"></div>');
				$("body").append(`
		<div class="popup">
			<p>${popupMessage}</p>
		</div>
	`);
				$(".popup").css({
					width: "53%",
					position: "absolute",
					bottom: "40px",
					left: "50%",
					transform: "translate(-50%)",
					background: swoopColor,
					display: "none",
					"border-radius": "5px 5px 0 0",
					"text-align": "center",
					color: swoopTextColor
				});
				let svgArea = $(".svgArea");
				svgArea.css({
					width: "100%",
					height: "50px",
					position: "absolute",
					top: "100%",
					left: "50%",
					transform: "translate(-50%,-100%)"
				});
				let wW = svgArea.width();
				let wH = svgArea.height();
				svgArea.html(`
		<svg class="swoopSVG" width="${wW}" height="${wH}" viewBox="0 0 ${wW} ${wH}">
  		<path class="path" style="transition:2s" stroke-dashoffset= "${
					2 * wW
				}" fill="none" stroke="${swoopColor}" stroke-width="10px" d="
			M ${-wW - wW * 1.5} ${wH - 5} 
			h ${wW + wW * 1.5 + wW * 0.1} 
			C ${wW * 0.25} ${wH - 5} ${wW * 0.1} ${10} ${wW * 0.25} ${10} 
			H ${wW * 0.75} 
			C ${wW * 0.9} ${10} ${wW * 0.75} ${wH} ${wW * 0.9} ${wH - 5} 
			H ${wW + wW * 0.1}
			"/>
</svg>
	`);

				const path = document.querySelector(".path");
				let pathLength = path.getTotalLength();
				path.style.strokeDashoffset = pathLength;
				path.style.strokeDasharray = pathLength;
				setTimeout(function () {
					path.style.strokeDashoffset = -pathLength / 2;
					popupDisplayed = true;
				}, 10);
				setTimeout(function () {
					$(".popup").slideDown();
				}, 700);
				setTimeout(function () {
					path.style.strokeDashoffset = -pathLength;
					$(".popup").slideUp();
				}, popupMS);
				setTimeout(function () {
					$(".svgArea").remove();
					$(".popup").remove();
					popupDisplayed = false;
				}, popupMS + 2000);
			}
		}
	};
})(jQuery);
