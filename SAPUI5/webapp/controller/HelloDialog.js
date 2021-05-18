sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
    /**
     * 
     * @param {typeof sap.ui.base.ManagedObject} ManagedObject
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (ManagedObject, Fragment) {
        "use strict"

        return ManagedObject.extend("logaligroup.SAPUI5.controller.HelloDialog", {

            constructor: function (oView) {
                // @ts-ignore
                this._oView = oView;
            },

            exit: function () {
                // @ts-ignore
                delete this._oView;
            },

            open: function () {

                // @ts-ignore
                const oView = this._oView;

                // create dialog lazily
                if (!oView.byId("helloDialog")) {

                    let oFragmentController = {
                        onCloseDialog: function () {
                            // @ts-ignore
                            oView.byId("helloDialog").close();
                        }
                    };

                    //load asyncronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "logaligroup.SAPUI5.view.HelloDialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    oView.byId("helloDialog").open();
                }
            }
        });
    });