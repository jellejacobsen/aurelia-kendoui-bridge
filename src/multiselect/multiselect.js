import {inject} from 'aurelia-dependency-injection';
import {customElement, bindable, children, ViewResources} from 'aurelia-templating';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import {constants} from '../common/constants';
import 'kendo.multiselect.min';
import 'kendo.virtuallist.min';

@customElement(`${constants.elementPrefix}multiselect`)
@generateBindables('kendoMultiSelect', ['template'])
@inject(Element, WidgetBase, ViewResources)
export class Multiselect {

  @bindable kOptions = {};
  @children(`${constants.elementPrefix}template`) templates;

  constructor(element, widgetBase, viewResources) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoMultiSelect')
                        .linkViewModel(this)
                        .useValueBinding()
                        .useViewResources(viewResources);
  }

  bind(ctx) {
    this.$parent = ctx;
  }

  attached() {
    this.recreate();
  }

  recreate() {
    let selectNode = getSelectNode(this.element);
    this.widgetBase.useTemplates(this, 'kendoMultiSelect', this.templates);

    this.kWidget = this.widgetBase.createWidget({
      rootElement: this.element,
      element: selectNode.length > 0 ? selectNode[0] : this.element,
      parentCtx: this.$parent
    });
  }

  propertyChanged(property, newValue, oldValue) {
    this.widgetBase.handlePropertyChanged(this.kWidget, property, newValue, oldValue);
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

function getSelectNode(element) {
  return element.querySelectorAll('select');
}
