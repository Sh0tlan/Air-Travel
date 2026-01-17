import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';

import ExpenseDialog from '@features/trip/components/Expenses/ExpenseDialog';
import ExpensesTable from '@features/trip/components/Expenses/ExpensesTable';
import { Expense, type Trip } from '@features/trip/types';
import AppButton from '@features/ui/AppButton';
import useDialog from '@hooks/useDialog';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setExpenses,
} from '../../store/tripWizardSlice';
import Pagination from '../Navigation/Pagination';

interface FormInput {
  expenses: Trip['expenses'];
}

export default function Expenses() {
  const { open, isOpen, close } = useDialog();
  const { expenses, onSubmit, handleSubmit, addExpense, removeExpense } =
    useExpensesForm({
      closeExpenseDialog: close,
    });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: '100%' }}
      gap={1}
    >
      <AppButton
        variant="outlined"
        onClick={open}
        endIcon={<AddIcon />}
        fullWidth
      >
        Add Expense
      </AppButton>

      <ExpenseDialog onSave={addExpense} isOpen={isOpen} onClose={close} />
      {expenses.length > 0 && (
        <ExpensesTable
          expenses={expenses}
          onDelete={removeExpense}
          autoScrollOnChange
        />
      )}
      <Pagination />
    </Stack>
  );
}

function useExpensesForm({
  closeExpenseDialog,
}: {
  closeExpenseDialog: () => void;
}) {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      expenses: trip.expenses,
    },
  });

  const expenses = watch('expenses');

  const { append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const addExpense = (expense: Expense) => {
    append(expense);
    closeExpenseDialog();
  };

  const removeExpense = (expenseId: string) => {
    remove(expenses.findIndex((expenses) => expenseId === expenses.id));
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setExpenses(data.expenses));
    dispatch(nextStep());
  };

  return {
    expenses,
    onSubmit,
    handleSubmit,
    addExpense,
    removeExpense,
  };
}
