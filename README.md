# VideoSub v0.9.5 #

Standards compliant video subtitles for HTML5 video tags. Original MooTools implementation by [Thomas Sturm](http://www.storiesinflight.com/js_videosub/), jQuery port by [Max Wheeler](http://www.icelab.com.au).

## Usage ##

Dead simple. Call the `videoSub()` function on any jQuery collection of video elements. This will probably look something like:

    $('video').videoSub();

Doing the following will parse the `<video>` elements you've specified and look for a `<track>` element. Your HTML should look something like the following:

    <video>
      <source src="/path/to/movie.mp4" type="video/mp4">
      <source src="/path/to/movie.ogg" type="video/ogg">
      <track src="/path/to/movie.srt" kind="subtitle" srclang="en-au" label="English">
    </video>

If there is a `<track>` subtitle, it will load and parse the subtitle file (SRT or WebSRT standard) and display the subtitles over the playing video. Should your browser already support `<track>` tags, VideoSub will feature detect and hide silently.

### Options ###

There are some basic options/defaults you can override for now:

    $('video').videoSub({
      containerClass:     'videosub-container',
      barClass:           'videosub-bar',
      useBarDefaultStyle: true
    });

By default, some simple styling is applied to the subtitles. You can remove them by setting `useBarDefaultStyle` to `false` and do all your styling via CSS instead.

## Changelog ##

**0.9.5**: Initial jQuery release

## Copyright & License ##

VideoSub is freeware. Attribution appreciated for both Thomas Sturm and Max Wheeler.