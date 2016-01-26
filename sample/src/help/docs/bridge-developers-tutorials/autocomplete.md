<br>

### 3. Autocomplete
<br>

This wrapper encapsulates the KendoUI module `kendo.autocomplete.min.js`, ensuring that it behaves as a standard Aurelia component. See how the Aurelia application uses this component **[here](#/help/docs/app_developers_tutorials/3._autocomplete_component)** and **[here](#/samples/autocomplete)**.
<br>

File `autocomplete.js`
<br>
```javascript
import {customAttribute, bindable, inject} from 'aurelia-framework';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import {fireEvent} from '../common/events';
import 'kendo-ui/js/kendo.autocomplete.min';
import 'kendo-ui/js/kendo.virtuallist.min';

@customAttribute('k-autocomplete')
@generateBindables('kendoAutoComplete')
@inject(Element, WidgetBase)
export class AutoComplete {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoAutoComplete')
                        .linkViewModel(this)
                        .setDefaultBindableValues();
  }

  bind(ctx) {
    this.$parent = ctx;

    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });

    // without these change and select handlers, when you select an options
    // the value binding is not updated
    this.kWidget.bind('change', (event) => {
      this.kValue = event.sender.value();

      // Update the kendo binding
      fireEvent(this.element, 'input');
    });

    this.kWidget.bind('select', (event) => {
      this.kValue = event.sender.value();

      // Update the kendo binding
      fireEvent(this.element, 'input');
    });
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

```




* * *
<br>
#### Next page: &nbsp;&nbsp; [Button component](#/help/docs/bridge_developers_tutorials/4._button_component)