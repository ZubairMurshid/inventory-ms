function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;