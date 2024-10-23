type SelectedItem = {
  key: string;
  text: string;
};

const selectedList: SelectedItem[] = [
  {
    key: 'all',
    text: 'All',
  },
  {
    key: 'today',
    text: 'Today',
  },
  {
    key: 'last7',
    text: 'Last 7 Days',
  },
  {
    key: 'last14',
    text: 'Last 14 Days',
  },
  {
    key: 'last30',
    text: 'Last 30 Days',
  },
  {
    key: 'last90',
    text: 'Last 90 Days',
  },
];

export default selectedList;
