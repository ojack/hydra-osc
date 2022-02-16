# hydra-osc [WIP]

Minimum example sending osc messages to and from hydra in the browser. 

Current version uses (osc-js)[https://github.com/adzialocha/osc-js], would like to switch to browserglue. 

To use:
1. install node.js on your operating system
2. run `npm install` to install dependencies
3. run the local websocket server `node server.js` 
4. paste the following code in hydra editor:

```javascript
await loadScript("https://cdn.jsdelivr.net/gh/ojack/hydra-osc/lib/osc.min.js")

_osc = new OSC()
_osc.open()

_osc.on("*", (m) => { console.log(m.address, m.args)})

```
Open the browser console to see osc messages logged from your local system. The local osc messages should be sent to the ports specified in `server.js`

More complete example (live at https://hydra.ojack.xyz/?sketch_id=8XySbQWWCzK4AaDF)
```javascript
/* 
Example using osc-js to bridge local udp / osc messages to the browser via websockets. For more information, see: https://github.com/ojack/hydra-osc
and follow instructions to run a local websocket server.
*/
await loadScript("https://cdn.jsdelivr.net/gh/ojack/hydra-osc/lib/osc.min.js")

_osc = new OSC()
_osc.open()

/* example to receive osc */

_osc.on("*", (m) => { console.log(m.address, m.args)})

hue = 0
_osc.on("/hue", (m) => {
  console.log(m)
  hue = m.args[0]/255
})

shape(4).color(-1, 1).hue(() => hue).out()

/* example to send osc */

send = (address = "", args) => {
  var message = new OSC.Message(address, args)
  _osc.send(message);
}

// execute this line to send an osc message
send('/hi', "hello")
```

This is only meant as an example. For easier use while livecoding, the implementation should allow overwriting old event handlers with new ones, and follow an api similar to the atom-hydra implementation of osc: https://github.com/hydra-synth/atom-hydra/blob/master/lib/osc-loader.js


