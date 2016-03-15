/*!
 * 
 */
/**
 * http://bannockburn.io/2013/06/realtime-grid-updates-with-extjs-nodejs-and-socket-io/
 * https://github.com/softwarezman/extjs-socketio/blob/master/SocketIO.js
 * https://github.com/softwarezman/extjs-socketio-gridplugin/blob/master/GridSocketIO.js
 * http://www.bryntum.com/blog/under-the-hood-of-the-socket-io-express-example/
 * http://www.bryntum.com/blog/nodejs-ext-scheduler-realtime-updates/
 * https://github.com/h2non/Sencha-WebSocket
 *
 * @type {*}
 */
Ext.namespace('Ext.ux.grid');

/**
 *
 * @type {*}
 */
Ext.ux.OdkSocketGridPanel = Ext.extend(Ext.grid.GridPanel, {

    /**
     *
     */
    socket: undefined,

    /**
     *
     */
    host: 'http://localhost',

    /**
     *
     */
    port: 8000,

    /**
     *
     */
    reconnect: true,

    /**
     *
     */
    max_reconnection_attemps: 5,

    /**
     *
     */
    initComponent: function (grid) {

        var me = this;

        this.grid = grid;

        if (!me.socket) {
            throw new Ext.ux.OdkSocketGridPanel.Error('socket-empty', me.socket);
        } else {
            me.store = Ext.StoreMgr.lookup(me.store);
        }

        var config = {

            forceFit: true,
            emptyText: '< Data kosong >',
            layout: 'fit',
            autoSizeColumns: true,
            enableColumnResize: true,
            enableColumnHide: true,
            enableColumnMove: true,
            enableHdaccess: false,
            columnLines: true,
            loadMask: true,
            buttonAlign: 'left',
            stripeRows: true,
            margins: '0 0 4 0',
            ds: me.store
        };

        Ext.apply(me, config);

        me.relayEvents(this.socket, ['socketconnect', 'socketdisconnect']);

        me.store.on('load', this.onStoreLoad, this);

        Ext.ux.OdkSocketGridPanel.superclass.initComponent.call(this, arguments);
    },

    onStoreLoad: function (store, records) {

        //this.socket.emit('server-doInitialLoad', records);
    },

    /**
     *
     * @param ct
     * @param position
     */
    onRender: function (ct, position) {

        Ext.ux.OdkSocketGridPanel.superclass.onRender.apply(this, arguments);
    }

});

/**
 * @class Ext.data.JsonReader.Error
 * Error class for JsonReader
 */
Ext.ux.OdkSocketGridPanel.Error = Ext.extend(Ext.Error, {

    constructor: function (message, arg) {
        this.arg = arg;
        Ext.Error.call(this, message);
    },

    name: 'Ext.ux.OdkSocketGridPanel'
});

Ext.apply(Ext.ux.OdkSocketGridPanel.Error.prototype, {

    lang: {
        'socket-empty': 'Socket tidak boleh kosong'
    }

});

Ext.reg('odksocketgridpanel', Ext.ux.OdkSocketGridPanel);
