sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, JSONModel, ResourceModel, Fragment) {
    "use strict";
    return Controller.extend("Projeto2.controller.App", {
        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("Projeto2/carros.json"));
            this.getView().setModel(oModel);
        },

        onBookPress: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "Projeto2.view.Dialog",
                    controller: this
                }).then(function (oPopover) {
                    var oCtx = oEvent.getSource().getParent().getBindingContext("carros");
                    var nCar = oCtx.getPath();
                    oView.addDependent(oPopover);
                    oPopover.bindElement(oCtx.getPath());
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                var oCtx = oEvent.getSource().getParent().getBindingContext("carros");
                var nCar = oCtx.getPath();
                oView.addDependent(oPopover);
                oPopover.bindElement(nCar);
                oPopover.openBy(oButton);
            });
        },
        onCloseDialog: function () {
            this.byId("Dialog").close();
        }
    });
});
