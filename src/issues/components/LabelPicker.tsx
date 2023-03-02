import { FC } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useLabels } from '../hooks/useLabels';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const { labelsQuery } = useLabels();  

  if (labelsQuery.isLoading) {
    return (<LoadingIcon />);
  }

  return (
    <>
      {
        labelsQuery.data?.map(({id, color, name}) => (
          <span 
              key={ id }
              className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(name) ? 'label-active' : ''}`}
              style={{ border: `1px solid #${ color }`, color: `#${ color }` }}
              onClick={ () => onChange(name) }
          >
              { name }
          </span>
        ))
      }
    </>
  )
}
