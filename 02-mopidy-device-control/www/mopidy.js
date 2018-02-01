/* eslint-disable  func-names */
/* eslint-disable max-len */
/* eslint quote-props: ['error', 'consistent']*/

const axios = require('axios');
const intents = require('./intent-schema.json');
const config = require('./config');
 
module.exports = {
    
    'actions': [
        {
            "name": "play",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.play"
            }
        },
        {
            "name": "pause",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.pause"
            }
        },
        {
            "name": "resume",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.play"
            }
        },
        {
            "name": "stop",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.stop"
            }
        },
        
        {
            "name": "volumeGet",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.get_volume"
            }
        },
        {
            "name": "volumeOff",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.set_volume",
                "params": [0]   
            }
        },
        {
            "name": "volumeDefault",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.set_volume",
                "params": [3]   
            }
        },
        {
            "name": "volumeSet",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.set_volume",
            },
            prepare: (request, slots) => {
                return new Promise((resolve, reject) => {
                    request.params = [slots[0].value];
                    return resolve(request);
                });
            }
        },
        {
            "name": "volumeIncrease",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.set_volume",
            },
            prepare: (request, slots) => {
                return new Promise((resolve, reject) => {
                    module.exports.getVolumePromise().then(res => {
                        var newVolume = Math.min(res + slots[0].value, 100); 
                        request.params = [newVolume];    
                        return resolve(request);
                    }).catch(err => {
                        return reject(err);
                    });
                });
            }
        },
        {
            "name": "volumeDecrease",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.mixer.set_volume",
            },
            prepare: (request, slots) => {
                return new Promise((resolve, reject) => {
                    module.exports.getVolumePromise().then(res => {
                        var newVolume = Math.max(res - slots[0].value, 0); 
                        request.params = [newVolume];    
                        return resolve(request);
                    }).catch(err => {
                        return reject(err);
                    });
                });
            }
        },

        {
            "name": "getPlaylists",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playlists.as_list",
            }
        },
        {
            "name": "getPlaylistItems",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playlists.get_items",
            },
            prepare: (request, slots, params) => {
                return new Promise((resolve, reject) => {
                    request.params = {
                        uri: params
                    };
                    return resolve(request);
                });
            }
        },
        {
            "name": "tracklistAdd",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.tracklist.add",
            },
            prepare: (request, slots, params) => {
                return new Promise((resolve, reject) => {
                    request.params = {
                        "uri": params
                    };
                    return resolve(request);
                });
            }
        },

        {
            "name": "radioPlay",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.play",
            },
            prepare: (request, slots) => {
                return module.exports._askTrack(request, "[Radio Streams]", slots[0].value - 1);
            },
        },

        {
            "name": "trackPlay",
            "method": "POST",
            "request": {
                "jsonrpc": "2.0", 
                "id": 1, 
                "method": "core.playback.play",
            },
            prepare: (request, slots) => {
                return module.exports._askTrack(request, "Favourites", slots[0].value - 1);
            },
        }
    ],

    tracklistAddPromise: (uri) => {
        var action = module.exports.actions.filter(x => { return x.name == "tracklistAdd" }).pop();
        return new Promise((resolve, reject) => {
            module.exports.requestPromise(action, {}, uri).then((res) => {
                console.log("TRACKLIST ADD:", res.data);
                return resolve(res.data.result);
            }).catch((err) => {
                console.error("TRACKLIST ADD:", err);
                return reject(err)
            });
        });
    },

    getPlaylistItemsPromise: (uri) => {
        var action = module.exports.actions.filter(x => { return x.name == "getPlaylistItems" }).pop();
        return new Promise((resolve, reject) => {
            module.exports.requestPromise(action, {}, uri).then((res) => {
                //console.log("GET PLAYLIST ITEMS:", res.data);
                return resolve(res.data.result);
            }).catch((err) => {
                console.error("GET PLAYLIST ITEMS:", err);
                return reject(err)
            });
        });
    },

    getPlaylistPromise: () => {
        var action = module.exports.actions.filter(x => { return x.name == "getPlaylists" }).pop();
        return new Promise((resolve, reject) => {
            module.exports.requestPromise(action, {}).then((res) => {
                //console.log("GET PLAYLIST:", res.data);
                return resolve(res.data.result);
            }).catch((err) => {
                console.error("GET PLAYLIST:", err);
                return reject(err)
            });
        });
    },

    getVolumePromise: () => {
        var action = module.exports.actions.filter(x => { return x.name == "volumeGet" }).pop();
        return new Promise((resolve, reject) => {
            module.exports.requestPromise(action, {}).then((res) => {
                console.log("GET VOLUME:", res.data);
                return resolve(res.data.result);
            }).catch((err) => {
                console.error("GET VOLUME:", err);
                return reject(err)
            });
        });
    },

    requestPromise: (action, payload, params) => {
        var schemas = intents.intents.filter(x => {
            return x.intent == action.name;
        });
        var schema = {
            slots: []
        };
        if (schemas.length > 0)
            schema = schemas.pop();

        var slots = [];
        if (schema.slots) {
            slots = schema.slots.map(x => {
                return {
                    name: x.name,
                    value: x.type == 'AMAZON.NUMBER' ? parseInt(payload[x.name]) : payload[x.name]
                };
            });
        }

        if (action.prepare) {
            return new Promise((resolve, reject) => {
                action.prepare(action.request, slots, params).then(result => {
                    action.request = result;
                    return resolve(module.exports._askMopidy(action));
                }).catch(err => {
                    return reject(err);
                })
            });
            
        } else {
            return module.exports._askMopidy(action);
        }

        
    },

    _askMopidy: (action) => {
        console.log("Ask mopidy:", action.request);
        return axios({
            method: action.method,
            url: config.mopidyEndpoint,
            data: action.request
        });
    },

    _askTrack: (request, tracklistName, trackIndex) => {
        return new Promise((resolve, reject) => {
            module.exports.getPlaylistPromise().then(res => {
                var radioPlaylists = res.filter(x => x.name == tracklistName);
                if (radioPlaylists.length == 0) 
                    return reject("Radio playlist not found");
                var radioPlaylist = radioPlaylists.pop();
                var uri = radioPlaylist.uri;
                module.exports.getPlaylistItemsPromise(uri).then((res) => {
                    var playlistItem = res[trackIndex];
                    if (playlistItem) {
                        module.exports.tracklistAddPromise(playlistItem.uri).then((res) => {
                            request.params = {
                                "tlid" : res[0].tlid
                            };
                            return resolve(request);
                        }).catch((err) => {
                            return reject(err);        
                        });
                    } else {
                        return reject("Playlist too short, {res.length} items in total, {trackIndex} requested");    
                    }
                }).catch((err) => {
                    return reject(err);
                })
            }).catch(err => {
                return reject(err);
            });
        });
    }    

};
