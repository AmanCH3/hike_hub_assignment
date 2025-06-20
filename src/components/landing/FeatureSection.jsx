import { CheckCheck, Leaf, Users2, Award } from "lucide-react";

const features = [
  {
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    title: "Trail Discovery",
    description: "Browse and filter trails by difficulty, location, and more.",
  },
  {
    icon: <Users2 className="h-6 w-6 text-green-600" />,
    title: "Group Hikes",
    description: "Create or join a hiking group and make new friends.",
  },
  {
    icon: <CheckCheck className="h-6 w-6 text-green-600" />,
    title: "Packing Checklist",
    description: "Never forget essential gear with personalized checklists.",
  },
  {
    icon: <Award className="h-6 w-6 text-green-600" />,
    title: "Achievements",
    description: "Track your progress and earn badges for completed hikes.",
  },
];

const HikeFeatures = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-14">
          Everything You Need for Your Hike
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start text-left hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="p-3 rounded-full bg-green-100 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HikeFeatures;
