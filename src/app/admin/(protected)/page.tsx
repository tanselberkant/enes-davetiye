import AttendenceList from "@/components/AttendenceList";

export default function AdminHome() {
  return (
    <div className="text-black max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Katılımcı Listesi</h1>
      <AttendenceList />
    </div>
  );
}
