/*!
 * 
 */
/**
 * NodeJS Socket For ExtJS 3.4.1.1
 *
 * @author    Moeloet Odenktools
 * @copyright (c) 2013, by Ing. Moeloet Odenktools
 * @date      28 December 2013
 * @version   $Id: Ext.ux.OdkSocketIO.js 220 2013-12-28 Moeloet $
 *
 * @license Ext.ux.OdkSocketIO is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * License details: http://www.gnu.org/licenses/lgpl.html
 *
 *
 * References :
 *
 * http://docs.sencha.com/core/manual/content/element.html
 * http://bannockburn.io/2013/06/realtime-grid-updates-with-extjs-nodejs-and-socket-io/
 * https://github.com/softwarezman/extjs-socketio/blob/master/SocketIO.js
 * https://github.com/softwarezman/extjs-socketio-gridplugin/blob/master/GridSocketIO.js
 * http://www.bryntum.com/blog/under-the-hood-of-the-socket-io-express-example/
 * http://www.bryntum.com/blog/nodejs-ext-scheduler-realtime-updates/
 * https://github.com/h2non/Sencha-WebSocket
 *
 */
Ext.namespace('Ext.ux');

Ext.ux.OdkSocketIO = function (config) {

    Ext.apply(this, config);

    try {

        var me = this;

//        if (this.statics.has === false)
//            throw new Error ('Socket.IO client library in not loaded. ');

//        if (me.store)
//            me.store = Ext.StoreMgr.lookup(me.store);

        this.addEvents(

            /**
             * @event connect
             * Fires when the component has connected the backend server
             * @param {Socket.IO} This
             * @param {Event} connect event details
             * @param {Object} Arguments passed to the connect string
             */
            'connect',

            /**
             * @event socketdisconnect
             * Fires when the component has been disconnected from the backend server
             * @param {Socket.IO} This
             * @param {Event} connect event details
             * @param {Object} Arguments passed to the connect string
             */
            'disconnect',


            'getDataStore'
        );

        me.socket = io.connect(me.host, {
            port: me.port,
            reconnect: me.reconnect,
            'max reconnection attempts': parseInt(me.max_reconnection_attemps),
            'transports': ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']
        });

        me.socket.on('connect', function () {

            me.fireEvent("connect", me, arguments);
        });

        me.socket.on('disconnect', function () {

            //console.log("disconnect from nodejs");

            me.fireEvent("disconnect", me, arguments);
        });
		
        if (Ext.isObject(me.emitters)) {

            for (var event in me.emitters) {
				
				console.log(event);

                this.socket.on(event, me.emitters[event]);
            }
        }

        //SEND EVENT CLIENT TO SERVER (load data in first time...)
        //this.doInitialLoad();

    } catch (e) {
        throw new Error(e);
    }

    Ext.ux.OdkSocketIO.superclass.constructor.call(me, arguments);

}; // eo constructor

/**
 *
 */
Ext.extend(Ext.ux.OdkSocketIO, Ext.util.Observable, {

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @public
     */
    host: 'http://localhost',

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @public
     */
    port: 9999,

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @public
     */
    reconnect: true,

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @private
     */
    socket: null,

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @public
     */
    max_reconnection_attemps: 5,

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @public
     */
    store: null,

    /**
     * @property {Number} socketId
     * The current socket counter ID
     * @readonly
     */
    socketId: 0,

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @private
     */
    loaded: false,

    /**
     * Listeners Object config
     * @cfg {Object} listeners
     */
    listeners: {},

    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @private
     */
    emitters: {},

    init: function () {

        //this.grid = grid;

        if (this.store)
            this.store = Ext.StoreMgr.lookup(this.store);

        this.onRender = this.onRender.createSequence(this.onRender, this);

    },

    onRender: function () {

        //console.log('grid : ', this.grid);
    },
	
    /**
     * Emit to the Socket.IO server
     * @param {String} event Event name. Required
     * @param {Object/String} data Data to send. Required
     * @protected
     */
    emit: function (event, data) {

        this.socket.emit(event, data);
    },

    /**
     * Send data to the Socket.IO server
     * @param {Object/String} data Data to send. Required
     * @param {String} event Server event name. Required
     * @protected
     */
    send: function (data) {

        this.socket.send(data);

    },

    /**
     * Returns the Socket.IO instance
     * @return {Object} Socket.IO instance
     */
    getSocketIO: function () {
        return this.socket;
    }


//    /**
//     * Emit event to server in order to receive initial data for store from the DB.
//     */
//    doInitialLoad: function (storeType) {
//
//        console.log(storeType);
//
//        this.socket.emit('client-doInitialLoad', {storeType: storeType});
//
//    },
//
//    /**
//     * On adding records to client store, send event to server and add items to DB.
//     */
//    doAdd: function (store, operation, opts) {
//
//        if (operation.action === 'create') {
//
//            var recordsData = [],
//                records = operation.getRecords();
//
//            if (records.length) {
//                for (var i = 0, l = records.length; i < l; i += 1) {
//                    recordsData.push({
//                        data: records[i].data,
//                        internalId: records[i].internalId
//                    });
//                }
//            } else {
//                recordsData.push({
//                    data: records.data,
//                    internalId: records.interalId
//                });
//            }
//
//            this.socket.emit('client-doAdd', {records: recordsData, storeType: opts.storeType});
//        }
//
//    },
//
//    /**
//     * On adding records to DB event is received and records are added to the client store
//     */
//    onAdd: function (data) {
//        var storeType = data.storeType,
//            data = data.records,
//            record,
//            records = [],
//            view = this.owner.getView(),
//            fAct = this.validationFailureAction,
//            current;
//
//        if (this.getStoreByType(storeType)) {
//            store = this.getStoreByType(storeType),
//                modelIdProperty = new store.model().idProperty;
//        } else {
//            return
//        }
//
//
//        store.suspendEvents();
//        //store.suspendAutoSync();
//
//        for (var i = 0, l = data.length; i < l; i += 1) {
//            current = data[i].data;
//
//            record = store.getById(current[modelIdProperty]);
//            if (!record) {
//                //delete internalId property from the data as it's not needed
//                delete current.internalId;
//
//                record = new store.model(current);
//
//                records.push(record);
//                store.insert(0, record);
//
////                if (this.validateRecords('update', record) !== false) {
////                    records.push(record);
////                    store.insert(0, record);
////                } //We don't do anything if they fail since it just won't add the record
//
//            }
//        }
//
//        //resume events => refreshing views
//        //store.resumeAutoSync();
//        store.resumeEvents();
//
//        this.refreshView(view);
//
//        if (records.length > 0) {
//            store.fireEvent('socketAdd', store, records, arguments);
//
//            this.applyEffect(records);
//        }
//    },
//
//    /**
//     * On adding records to DB, sync event is received with records assigned ID's. Data should be synced
//     * with client store.
//     */
//    syncId: function (data) {
//        var storeType = data.storeType,
//            data = data.data,
//            store = this.getStoreByType(storeType),
//            records = store.getRange();
//
//        for (var i = 0, l = data.length; i < l; i += 1) {
//            current = data[i];
//            internalId = current.internalId;
//            delete current.internalId;
//
//            Ext.Array.each(records, function (rec, idx) {
//                if (rec.internalId == internalId) {
//                    rec.set('Id', current.Id);
//                    return false;
//                }
//            });
//        }
//    },
//
//    /**
//     * On updating records in client store, send event to server and update items in DB.
//     */
//    doUpdate: function (store, records, type, changes, opts) {
//
//        if (type === 'commit') {
//
//            var recordsData = [];
//
//            if (records.length) {
//                for (var i = 0, l = records.length; i < l; i += 1) {
//                    recordsData.push({
//                        data: records[i].data
//                    });
//                }
//            } else {
//                recordsData.push({
//                    data: records.data
//                });
//            }
//            this.socket.emit('client-doUpdate', {records: recordsData, storeType: opts.storeType});
//
//        }
//    },
//
//    /**
//     * On updating records in DB event is received and data in client store is updated.
//     */
//    onUpdate: function (data) {
//        var storeType = data.storeType,
//            data = data.records,
//            record,
//            records = [],
//            current,
//            fAct = this.validationFailureAction,
//            store, modelIdProperty;
//
//        if (this.getStoreByType(storeType)) {
//            store = this.getStoreByType(storeType),
//                modelIdProperty = new store.model().idProperty;
//        } else {
//            return
//        }
//
//
//        store.suspendEvents();
//        //store.suspendAutoSync();
//
//        for (var i = 0, l = data.length; i < l; i += 1) {
//            current = data[i].data;
//
//            record = store.getById(current[modelIdProperty]);
//            if (record) {
//                current.startDate && (current.StartDate = new Date(current.StartDate));
//                current.endDate && (current.endDate = new Date(current.EndDate));
//
//                if (this.validateRecords('update', Ext.create(record.modelName, current)) !== false) {
//                    record.set(current);
//                    /**
//                     * If you don't set dirty = false it will try and submit
//                     * an update with this record the next time you update any other record
//                     */
//                    record.dirty = false;
//                    records.push(record);
//                } else {
//                    if (fAct === 'remove') {
//                        store.remove(record);
//                    }
//                }
//            }
//        }
//
//
//        //store.resumeAutoSync();
//        store.resumeEvents();
//
//        this.refreshView();
//
//        if (records.length > 0) {
//            store.fireEvent('socketUpdate', store, records, arguments);
//            this.applyEffect(records);
//        }
//    },
//
//    /**
//     * On adding removing records from client store, send event to server and remove items from DB.
//     */
//    doRemove: function (store, records, index, opts) {
//        var recordsData = [],
//            modelIdProperty = new store.model().idProperty;
//
//        if (records.length) {
//            for (var i = 0, l = records.length; i < l; i += 1) {
//                recordsData.push({
//                    data: records[i].get(modelIdProperty)
//                });
//            }
//        } else {
//            recordsData.push({
//                data: records.get(modelIdProperty)
//            });
//        }
//
//        this.socket.emit('client-doRemove', {records: recordsData, storeType: opts.storeType});
//    },
//
//    /**
//     * On removing records from DB event is received and elements are deleted from client store.
//     *
//     */
//    onRemove: function (data) {
//        var storeType = data.storeType,
//            data = data.records,
//            record,
//            records = [],
//            current;
//
//        if (this.getStoreByType(storeType)) {
//            store = this.getStoreByType(storeType),
//                modelIdProperty = new store.model().idProperty;
//        } else {
//            return
//        }
//
//        store.suspendEvents();
//        //store.suspendAutoSync();
//
//        for (var i = 0, l = data.length; i < l; i += 1) {
//            current = data[i].data;
//            record = store.getById(current);
//
//            if (this.validateRecords('update', record) !== false) {
//                store.remove(record);
//                records.push(record);
//            } //We don't have to do anything else since they didn't update any data but just tried to delete it
//        }
//
//        store.resumeAutoSync();
//        store.resumeEvents();
//
//        this.refreshView();
//
//        /**
//         * Clear out the removed records as they have already been deleted by the
//         * original client
//         */
//        if (records.length > 0) {
//            store.removed = [];
//            store.fireEvent('socketRemove', store, records, arguments);
//        }
//        //this.applyEffect(records);
//    },
//
//    /**
//     * Custom function to refresh views for outlyer situations where the
//     * view may need a different function to be called
//     * @param {Ext.grid.View} view The grid's parent view
//     */
//    refreshView: function () {
//        var view = this.owner.getView();
//
//        view.refreshKeepingScroll ? view.refreshKeepingScroll() : view.refresh();
//    },
//
//    /**
//     * Applys a visual effect to the records so users who receive updates
//     * can see that they have changed/been added
//     * @param {Ext.data.Model[]} records
//     */
//    applyEffect: function (records) {
//        var view = this.owner.getView(),
//            node;
//
//        for (var i = 0; i < records.length; i++) {
//            //Added support for Bryntum Scheduler's getElementFromEventRecord.
//            node = view.getNode(records[i]) ? view.getNode(records[i]) : view.getElementFromEventRecord(records[i]);
//            if (node) {
//                Ext.fly(node).highlight("aa0000", {
//                    attr: 'color', duration: 5000
//                });
//            }
//        }
//    },
//
//
//    /**
//     * Select either Resource or Event store
//     */
//    getStoreByType: function (storeType) {
//        if (storeType == this.getStore().storeId || storeType.storeId == this.getStore().storeId) {
//            return this.getStore();
//        } else {
//            return this[storeType.storeProperty];
//        }
//
//    }

});

Ext.reg('socketio', Ext.ux.OdkSocketIO);

//Ext.preg('Ext.ux.OdkSocketIO', Ext.ux.OdkSocketIO);