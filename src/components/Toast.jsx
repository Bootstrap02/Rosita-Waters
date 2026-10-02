import { useStore } from '../context/StoreContext.jsx';

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className={'toast' + (toast.on ? ' on' : '')} role="status">
      {toast.text}
    </div>
  );
}
