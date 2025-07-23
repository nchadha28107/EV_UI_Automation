import { VehicleSpecs } from "@/types";

const EVSpecifications = ({ ev }: { ev: VehicleSpecs }) => {
  const specs = [
    {
      label: "Battery",
      value: `${ev.battery_capacity_kWh} kWh`,
    },
    {
      label: "Charging",
      value: `${ev.charging_speed_kW} kW`,
    },
    {
      label: "Drivetrain",
      value: ev.drivetrain,
    },
    {
      label: "Autopilot",
      value: ev.autopilot ? "Yes" : "No",
    },
    {
      label: "Range",
      value: `${ev.range_km} km`,
    },
    {
      label: "Accidents",
      value: ev.accidents ? "Yes" : "No",
    },
    {
      label: "Seats",
      value: ev.seats,
    },
    {
      label: "Condition",
      value: ev.condition,
    },
    {
      label: "Color",
      value: ev.color,
    },
  ];

  return (
    <div className="p-6  rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Vehicle Specifications</h2>
      <div className="rounded-lg text-lg grid grid-cols-2 sm:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-1">
              <span className="text-gray-600">{spec.label}:</span>{" "}
              <span className="font-semibold">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EVSpecifications;
