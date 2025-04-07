import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import VerifiedIcon from "@mui/icons-material/Verified"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"


const trustFeatures = [
  {
    icon: <LocalShippingIcon fontSize="large" className="text-primary mb-2" />,
    title: "Fast Shipping",
    desc: "Get your gadgets delivered quickly and safely, every time.",
  },
  {
    icon: <VerifiedIcon fontSize="large" className="text-success mb-2" />,
    title: "100% Genuine Products",
    desc: "We only sell authentic and top-rated tech.",
  },
  {
    icon: <AutorenewIcon fontSize="large" className="text-warning mb-2" />,
    title: "Easy Returns",
    desc: "No-hassle returns within 7 days of delivery.",
  },
  {
    icon: <SupportAgentIcon fontSize="large" className="text-danger mb-2" />,
    title: "24/7 Customer Support",
    desc: "We're here to help—day or night, anytime.",
  },
]

const TrustSection = () => {
  return (
    <section className="trust-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Why Shop With Us</h2>
        <div className="row text-center">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="col-6 col-md-3 mb-4">
              <div className="trust-card p-3 h-100">
                {feature.icon}
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="small text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
