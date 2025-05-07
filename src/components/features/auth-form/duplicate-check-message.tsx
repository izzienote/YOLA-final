import { clsx } from 'clsx';

interface Message {
  errorMessage: string | null;
  successMessage: string | null;
}

const DuplicateCheckMessage = ({ successMessage, errorMessage }: Message) => {
  return (
    <p
      className={clsx(
        'absolute -bottom-[25.2px] text-[0.8rem] font-medium',
        successMessage ? 'text-secondary-grey-900' : 'text-destructive'
      )}
    >
      {successMessage ? successMessage : errorMessage}
    </p>
  );
};

export default DuplicateCheckMessage;
