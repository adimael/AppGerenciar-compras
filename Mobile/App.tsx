import { ClientProvider } from "./mobile/src/context/Client";
import AppNavigation from "./mobile/src/navigation/AppNavigation";

export default function App() {
  return (
    <ClientProvider>
      <AppNavigation />
    </ClientProvider>
  );
}
