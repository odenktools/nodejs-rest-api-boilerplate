Ext.onReady(function () {

	Ext.PagingToolbar.prototype.doRefresh = function () {
		var me = this;
		var current = me.store.currentPage;
	};

	var host = '127.0.0.1';

	var port = '9999';

	var url = 'http://' + host + ':' + port + '/';

	/**
	 *
	 * @type {Ext.data.Store}
	 */
	var dataStore = new Ext.data.Store({

			url : url,

			fields : [{
					name : "id_mhs",
					mapping : "id_mhs"
				}, {
					name : "nama_mhs",
					mapping : "nama_mhs"
				}, {
					name : "kelas_mhs",
					mapping : "kelas_mhs"
				}
			],
			baseParams : {
				start : 0,
				limit : 5
			},
			reader : new Ext.data.JsonReader({
				root : 'records',
				totalProperty : 'totals',
				idProperty : 'id_mhs',
				fields : ['id_mhs', 'nama_mhs', 'kelas_mhs']
			}),
			totalProperty : 'totals',
			idProperty : 'id_mhs',
			autoLoad : false
		});

	/**
	 *
	 * @type {Ext.ux.OdkSocketIO}
	 */
	var socket = new Ext.ux.OdkSocketIO({

			store : dataStore,

			host : host,

			port : port,

			/* Receive from server */
			emitters : {

				'server-Mahasiswa-fetch-record' : function (data) {

					var records = data.records;
					var current;

					//delete socket.store._autoLoad;
					socket.store.loadData(data);
					console.log(records);
					//alert('receive from server');

					for (var i = 0, l = records.length; i < l; i += 1) {

						//current = records[i].records;

						//console.log(records[i].nama);

					}

				}

			},

			listeners : {

				connect : function () {
					socket.emit('client-Mahasiswa-get-record', null);
				},

				disconnect : function () {
					console.log('disconnect');
					//alert('disconnect');
				}

			}

		});

	/**
	 *
	 * @type {Ext.PagingToolbar}
	 */
	var bbar = new Ext.PagingToolbar({
			pageSize : 5,
			store : dataStore,
			displayInfo : true,
			beforePageText : "Halaman",
			afterPageText : "dari {0}",
			displayMsg : 'Menampilkan data {0} - {1} dari {2} data',
			emptyMsg : 'Data kosong',
			doRefresh : function () {
				var me = this,
				current = me.store.currentPage;

				if (me.fireEvent('beforechange', me, current) !== false) {

					socket.emit('clientNodetest-get-record', null);
					//dataStore.reload();
					//me.store.loadPage(current);
					//me.store.loadData(current);
				}
			}
		});

	/**
	 *
	 * @type {Ext.form.FormPanel}
	 */
	var form_test = new Ext.form.FormPanel({
			width : 400,
			height : 100,
			buttonAlign : 'left',
			bodyStyle : 'padding: 5px',
			border : false,
			disabled : false,
			maskDisabled : false,
			items : [{
					xtype : 'textfield',
					fieldLabel : "id_mhs",
					id : 'id_mhs',
					hidden : true,
					allowBlank : true,
					width : 250
				}, {
					xtype : 'textfield',
					fieldLabel : "nama_mhs",
					id : 'nama_mhs',
					allowBlank : false,
					width : 250
				}, {
					xtype : 'textfield',
					fieldLabel : "kelas_mhs",
					id : 'kelas_mhs',
					allowBlank : false,
					width : 250
				}
			],
			buttons : [{
					text : "Insert using api",
					id : 'btn_save_api',
					formBind : true,
					iconCls : 'silk-disk',
					handler : function () {

						var data = Ext.util.JSON.encode(form_test.getForm().getValues());

						Ext.Ajax.useDefaultXhrHeader = true;

						Ext.Ajax.request({
							dataType : 'jsonp',
							url : url + 'mahasiswa/insert',
							jsonData : data,
							method : 'POST',
							headers : {
								"Content-Type" : "application/json"
							},
							success : function (result) {

								socket.emit('clientNodetest-get-record', null);

								Ext.MessageBox.alert('Success', 'Data berhasil diinput');

								//Ext.getCmp('nama').setValue('Rahyan-' + Ext.id());

								//Ext.getCmp('kelas').setValue('IT-' + Ext.id());

							},
							failure : function (result) {
								var options = Ext.decode(result.responseText).message;
								Ext.MessageBox.alert('Success', result);
								console.log(result);
							}
						});
					}

				}, {
					text : "Insert using socket",
					id : 'btn_save',
					formBind : true,
					iconCls : 'silk-disk',
					handler : function () {

						var data = Ext.util.JSON.encode(form_test.getForm().getValues());

						socket.emit('client-Mahasiswa-insert', {
							data : data,
							status : '200'
						});

					}
				}
			]

		});

	var grid = new Ext.grid.GridPanel({
			plugins : [socket],
			//store: socket.store,
			store : dataStore,
			title : 'Data',
			columns : [new Ext.grid.RowNumberer(), {
					header : "id",
					width : 120,
					dataIndex : 'id_mhs',
					sortable : true
				}, {
					header : "nama_mhs",
					width : 180,
					dataIndex : 'nama_mhs',
					sortable : true
				}, {
					header : "kelas",
					width : 115,
					dataIndex : 'kelas_mhs',
					sortable : true
				}
			],

			tbar : [{
					text : 'Add',
					id : 'btn_add',
					iconCls : 'silk-add',
					handler : function () {
						window_input.show();

					}
				}, '-', {
					text : 'Edit',
					id : 'btn_edit',
					iconCls : 'silk-cog',
					handler : function () {

						if (grid.getSelectionModel().getSelected() == undefined)
							return;

						var id = grid.getSelectionModel().getSelected().data['id_mhs'];

						var data = {
							id : id
						};

						Ext.Ajax.request({
							dataType : 'json',
							disableCaching : false,
							url : url + 'mahasiswa/edit',
							jsonData : JSON.stringify({
								id : id
							}),
							method : 'POST',
							headers : {
								"Content-Type" : "application/json"
							},
							success : function (result) {

								var options = Ext.decode(result.responseText).records;

								//Ext.getCmp('id_mhs').setValue(options.id_mhs);
								//window_input.show();

								console.log(options);
							},
							failure : function (result) {}
						});

					}
				}, '-', {
					text : 'hapus',
					id : 'btn_hapus',
					iconCls : 'silk-delete',
					handler : function () {

						var id = grid.getSelectionModel().getSelected().data['id_mhs'];

						var data = {
							id : id
						};

						Ext.Ajax.request({
							dataType : 'json',
							disableCaching : false,
							url : url + 'mahasiswa/hapus',
							jsonData : JSON.stringify({
								id : id
							}),
							method : 'POST',
							headers : {
								"Content-Type" : "application/json"
							},
							success : function (result) {

								//var options = Ext.decode(result.responseText).records;

								//console.log(options);

							},
							failure : function (result) {}
						});

					}
				}
			],

			bbar : bbar,

			sm : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			viewConfig : {
				forceFit : true
			},
			height : 310,
			split : true,
			region : 'north'
		});

	/**
	 * Data Template
	 * @type {Array}
	 */
	var tplMarkup = [
		'Id: <a href="#" target="_blank">{id}</a><br/>',
		'Kelas: {kelas}<br/>',
		'Nama: {nama}<br/>'
	];

	var gridTpl = new Ext.Template(tplMarkup);

	var mainPanel = new Ext.Panel({

			renderTo : Ext.getBody(),
			frame : true,
			title : 'ExtJS with NodeJS integrated',
			width : 700,
			height : 500,
			layout : 'border',
			items : [
				grid, {
					id : 'detailPanel',
					region : 'center',

					bodyStyle : {
						//height : '500px',
						background : '#ffffff',
						padding : '7px'
					},
					html : 'Please select a book to see additional details.'
				}
			]

		});

	var window_input = new Ext.Window({
			title : "Save data to NodeJS",
			layout : "fit",
			modal : true,
			resizable : false,
			maximizable : false,
			closeAction : "hide",
			hideMode : "offsets",
			constrainHeader : true,
			items : [
				form_test
			],
			listeners : {

				'show' : function () {
					Ext.getCmp('nama_mhs').setValue(Ext.id());
					//Ext.getCmp('kelas').setValue(Ext.id());
				},

				'beforehide' : function () {

					Ext.getCmp('nama_mhs').setValue('');
					Ext.getCmp('kelas_mhs').setValue('');

				}
			}
		});

	grid.getSelectionModel().on('rowselect', function (sm, rowIdx, r) {
		var detailPanel = Ext.getCmp('detailPanel');
		gridTpl.overwrite(detailPanel.body, r.data);
	});

});
