import getAllotropes from "./getAllotropes.mjs"
import getGroupOrPeriod from "./getGroupOrPeriod.mjs"
import getImageData from "./getImageData.mjs"
import getValue from "./getValue.mjs"

export default function (data, name, description) {
  return {
    name: name,
    description: description,
    allotropes: getAllotropes(data, name),
    appearance: getValue(data, "Appearance"),
    abundance_earth: getValue(data, "in the Earth's crust"),
    standard_atw: getValue(data, { type: "list" }),
    atomic_number: getValue(data, "Atomic number (Z)"),
    group: getGroupOrPeriod(data, "Group"),
    period: getGroupOrPeriod(data, "Period"),
    block: getValue(data, "Block"),
    phase_stp: getValue(data, "Phase at STP"),
    melt_point: getValue(data, "Melting point"),
    sublim_point: getValue(data, "Sublimation point"),
    boil_point: getValue(data, "Boiling point"),
    density_stp: getValue(data, "Density (at STP)"),
    density_bp: getValue(data, "when liquid (at b.p.)"),
    density_near_rt: getValue(data, "Density (near r.t.)"),
    triple_point: getValue(data, "Triple point"),
    critical_point: getValue(data, "Critical point"),
    heat_fusion: getValue(data, "Heat of fusion"),
    heat_vaporisation: getValue(data, "Heat of vaporization"),
    molar_heat_capacity: getValue(data, "Molar heat capacity"),
    oxidation_states: getValue(data, "Oxidation states").split(","),
    electronegativity: getValue(data, "Electronegativity"),
    ionization_energies: getValue(data, "Ionization energies"),
    covalent_radius: getValue(data, "Covalent radius"),
    van_der_waals_radius: getValue(data, "Van der Waals radius"),
    occurance: getValue(data, "Natural occurrence"),
    speed_sound: getValue(data, "Speed of sound"),
    thermal_conductivity: getValue(data, "Thermal conductivity"),
    thermal_expansion: getValue(data, "Thermal expansion"),
    electrical_resistivity: getValue(data, "Electrical resistivity"),
    magnetic_ordering: getValue(data, "Magnetic ordering"),
    molar_magnetic_susceptibility: getValue(data, "Molar magnetic susceptibility"),
    cas_number: getValue(data, "CAS Number"),
    discovered_by: getValue(data, "Discovery"),
    named_by: getValue(data, "Named by"),
    naming: getValue(data, "Naming"),
    first_isolation: getValue(data, "First isolation"),
    image: getImageData(data, { type: "image" }),
    spectral_line: getImageData(data, { value: `Spectral lines of ${name.toLowerCase()}` }),
    crystal_structure: {
      value: getValue(data, "Crystal structure"),
      image: getImageData(data, { name: "Crystal structure" }),
    },
  }
}
