import ResultsPage from "@/components/general/results/ResultsPage";
import getElectionsResults from "@/actions/getResults";

export default async function ElectionResultsDashboard() {
  const elections = await getElectionsResults();

  return <ResultsPage elections={JSON.stringify(elections)} />;
}
