/**
 * Detta kommer gå hyfsat fort att sätta upp, 
 * kommer copy paste:a från artikeln på bloggen. 
 */

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import { store } from './store.js'
import { router } from './router.js'
import app from './app.js'
import './socket.js'

// creates a global eventBus for 
// easy handling of publish-subscribe
// design pattern
//export const eventBus = new Vue()

// triggers all eventBusses who listens
// on the same channel name
//eventBus.$emit('channel-name', {payload})

// subscribes to channel-name emits(triggers)
//eventBus.$on('channel-name', payload => {
  // do something with payload
//})

// unsubscribe to channel-name
//eventBus.$off('channel-name')

// Note: a vue component will never unmount if
// theres a subscribed listener ($on) active.

// Best Practice: use Vuex instead of eventBus!

new Vue({
  store,
  router,
  render: h => h(app)
}).$mount('#app');

/**
 * Laddar vi om sidan efter vi lagt till alla
 * delar från Vue, så kommer vår nya 
 * index.html vara den vi ser i webbläsaren.
 * 
 * Dock märker jag att om jag laddar om sidan
 * när jag är på /about, så får jag den gamla
 * index.html serverad från vår backend. 
 * 
 * Vi behöver alltså starta om servern för att
 * detta ska funka!
 * 
 * Efter omstart av server så fungerar vår SPA
 * 
 * Nästa moment är att skapa en komponent
 * som hämtar dessa husdjur när man klickar
 * på en knapp. 
 * 
 * I mappen /views lägger vi alla komponenter
 * som ska laddas när vi bytar url. 
 * 
 * Mappen /components är där vi lägger alla små komponenter
 * som våra views, och andra komponenter, använder
 */