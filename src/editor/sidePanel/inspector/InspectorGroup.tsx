import Accordion from '../Accordion';
import InspectorField, { InspectorFieldProps } from './InspectorField';

export interface InspectorGroupProps {
  title: string
  expanded?: boolean
  items: InspectorFieldProps[] | InspectorGroupProps[]
}

function isGroup(obj: any): obj is InspectorGroupProps {
  return 'items' in obj;
}

export default function InspectorGroup(props: InspectorGroupProps) {
  const children: any[] = [];
  props.items.forEach((child: InspectorFieldProps | InspectorGroupProps) => {
    if (isGroup(child)) {
      children.push(
        <InspectorGroup title={child.title} items={child.items} key={Math.random()} />
      );
    } else {
      children.push(
        <InspectorField
          key={Math.random()}
          title={child.title}
          prop={child.prop}
          value={child.value}
          type={child.type}
          min={child.min}
          max={child.max}
          step={child.step}
          disabled={child.disabled}
          onChange={(prop: string, value: any) => {
            if (child.onChange !== undefined) {
              child.onChange(prop, value);
            }
          }}
        />
      );
    }
  });

  return (
    <Accordion label={props.title} open={props.expanded === true}>
      {children}
    </Accordion>
  );
}