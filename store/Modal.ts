import {atom} from 'jotai';

const ModalAtom = atom({
  open: false,
  title: '',
  content: '',
  type: ''
});

export default ModalAtom;
