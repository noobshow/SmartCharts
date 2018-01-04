import DialogContentTag from './UI/DialogContentTag';
import { CIQ } from '../../js/chartiq';

/**
 * View Dialog web component `<cq-view-dialog>`.
 *
 * See {@link CIQ.UI.ViewsMenu} for more details on menu management for this component
 * @namespace WebComponents.cq-dialog
 * @example
     <cq-dialog>
             <cq-view-dialog>
                <h4>Save View</h4>
                <div stxtap="close()" class="ciq-icon ciq-close"></div>
                <div style="text-align:center;margin-top:10px;">
                    <i>Enter name of view:</i>
                    <p>
                        <input spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" maxlength="40" placeholder="Name"><br>
                    </p>
                    <span class="ciq-btn" stxtap="save()">Save</span>
            </div>
        </cq-view-dialog>
     </cq-dialog>
 */
class ViewDialog extends DialogContentTag {
    /**
     * Saves the new view. This updates all cq-view menus on the screen, and persists the view in the nameValueStore.
     * @alias save
     * @memberof WebComponents.cq-view-dialog
     */
    save() {
        let viewName = this.node.find('input').val();
        if (!viewName) return;

        let self = this;
        let madeChange = false;
        let layout = this.context.stx.exportLayout();
        $('cq-views').each(function () {
            let obj = this.params.viewObj;
            let view;

            for (let i = 0; i < obj.views.length; i++) {
                view = obj.views[i];
                if (viewName == CIQ.first(view)) break;
            }
            if (i == obj.views.length) {
                view = {};
                view[viewName] = {};
                obj.views.push(view);
            }
            view[viewName] = layout;
            delete view[viewName].candleWidth;
            this.renderMenu();
            // this.context.stx.updateListeners("layout");
            if (!madeChange) {
                // We might have a cq-view menu on multiple charts on the screen. Only persist once.
                madeChange = true;
                this.params.nameValueStore.set('stx-views', obj.views);
            }
        });
        this.close();
    }
}


export default ViewDialog;
CIQ.UI.ViewDialog = document.registerElement('cq-view-dialog', ViewDialog);
