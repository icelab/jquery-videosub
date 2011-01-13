/* ------------------------------------------------------------------------------
  VideoSub v0.9.6

  Original MooTools implementation by [Thomas Sturm](http://www.storiesinflight.com)
  jQuery port by [Max Wheeler](http://www.icelab.com.au)
  Freeware, Attribution Appreciated
  ------------------------------------------------------------------------------ */

(function($) {
  var tcsecs, timecode_max, timecode_min;
  $.fn.videoSub = function(options) {
    var _a, opts;
    if (typeof (typeof (_a = $('<video>').addtrack) !== "undefined" && _a !== null)) {
      opts = $.extend({}, $.fn.videoSub.defaults, options);
      return this.each(function() {
        var $this, _a, bar, container, el, o, src;
        el = this;
        $this = $(this);
        o = (typeof (_a = $.meta) !== "undefined" && _a !== null) ? $.extend(opts, $this.data()) : opts;
        src = $('track', this).attr('src');
        if (typeof src !== "undefined" && src !== null) {
          container = $('<div class="' + o.containerClass + '">');
          container.css('position', 'relative');
          container = $this.wrap(container).parent();
          bar = $('<div class="' + o.barClass + '">');
          bar.css('width', $this.outerWidth() - 40);
          if (o.useBarDefaultStyle) {
            bar.css({
              'position': 'absolute',
              'bottom': '40px',
              'padding': '0 25px',
              'text-align': 'center',
              'color': '#ffffff',
              'font-family': 'Helvetica, Arial, sans-serif',
              'font-size': '16px',
              'font-weight': 'bold',
              'text-shadow': '#000000 1px 1px 0px'
            });
          }
          bar = bar.appendTo(container);
          el.subtitles = [];
          el.subcount = 0;
          el.update = function(req) {
            var r, records;
            records = req.replace(/(\r\n|\r|\n)/g, '\n').split('\n\n');
            r = 0;
            $(records).each(function(i) {
              el.subtitles[r] = [];
              return (el.subtitles[r++] = records[i].split('\n'));
            });
            $this.bind('play', function(e) {
              return (el.subcount = 0);
            });
            $this.bind('ended', function(e) {
              return (el.subcount = 0);
            });
            $this.bind('seeked', function(e) {
              var _b;
              el.subcount = 0;
              _b = [];
              while (timecode_max(el.subtitles[el.subcount][1]) < this.currentTime.toFixed(1)) {
                el.subcount++;
                if (el.subcount > el.subtitles.length - 1) {
                  el.subcount = el.subtitles.length - 1;
                  break;
                }
              }
              return _b;
            });
            return $this.bind('timeupdate', function(e) {
              var subtitle;
              subtitle = '';
              if (el.currentTime.toFixed(1) > timecode_min(el.subtitles[el.subcount][1]) && el.currentTime.toFixed(1) < timecode_max(el.subtitles[el.subcount][1])) {
                subtitle = el.subtitles[el.subcount][2];
              }
              if (el.currentTime.toFixed(1) > timecode_max(el.subtitles[el.subcount][1]) && el.subcount < (el.subtitles.length - 1)) {
                el.subcount++;
              }
              return bar.html(subtitle);
            });
          };
          return $.ajax({
            method: 'get',
            url: src,
            success: el.update
          });
        }
      });
    }
  };
  timecode_min = function(tc) {
    var tcpair;
    tcpair = tc.split(' --> ');
    return tcsecs(tcpair[0]);
  };
  timecode_max = function(tc) {
    var tcpair;
    tcpair = tc.split(' --> ');
    return tcsecs(tcpair[1]);
  };
  tcsecs = function(tc) {
    var secs, tc1, tc2;
    tc1 = tc.split(',');
    tc2 = tc1[0].split(':');
    return (secs = Math.floor(tc2[0] * 60 * 60) + Math.floor(tc2[1] * 60) + Math.floor(tc2[2]));
  };
  $.fn.videoSub.defaults = {
    containerClass: 'videosub-container',
    barClass: 'videosub-bar',
    useBarDefaultStyle: true
  };
})(jQuery);