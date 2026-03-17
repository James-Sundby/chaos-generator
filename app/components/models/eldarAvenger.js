export default function EldarAvenger({ primary, secondary, accent, pattern }) {
    let rightChestArmour, rightChestUndersuit, leftChestArmour, leftChestUndersuit, rightAbs, leftAbs, rightLegArmour, leftLegArmour, rightLegUndersuit, leftLegUndersuit, rightCod, leftCod, rightArmUndersuit, leftArmUndersuit, rightArmArmour, leftArmArmour, rightShoulder, leftShoulder, rightBackVent, leftBackVent, camera, rightHelmet, leftHelmet, rightFacePlate, leftFacePlate;

    const metal = "#3E494A"; // Mechanicus Standard Grey
    const accessories = accent;

    switch (pattern) {
        case "1":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = leftArmUndersuit = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightFacePlate = leftFacePlate = primary;

            rightHelmet = leftHelmet = rightArmUndersuit = rightArmArmour = secondary;
            break;

        case "2":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = primary;

            rightHelmet = leftHelmet = rightFacePlate = leftFacePlate = secondary;
            break;

        case "3":
            rightChestUndersuit = leftChestUndersuit = rightAbs = leftAbs = rightLegUndersuit = leftLegUndersuit = rightArmUndersuit = leftArmUndersuit = rightBackVent = leftBackVent = camera = primary;

            rightChestArmour = leftChestArmour = rightLegArmour = leftLegArmour = rightCod = leftCod = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightHelmet = leftHelmet = secondary;

            rightFacePlate = leftFacePlate = accent;
            break;

        case "4":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightBackVent = leftBackVent = camera = rightFacePlate = leftFacePlate = primary;

            rightHelmet = leftHelmet = rightShoulder = leftShoulder = secondary;
            break;

        case "5":
            leftChestArmour = leftChestUndersuit = leftAbs = rightLegArmour = rightLegUndersuit = rightCod = leftArmUndersuit = leftArmArmour = leftShoulder = leftBackVent = leftHelmet = leftFacePlate = primary;

            rightChestArmour = rightChestUndersuit = rightAbs = leftLegArmour = leftLegUndersuit = leftCod = rightArmUndersuit = rightArmArmour = rightShoulder = rightBackVent = camera = rightHelmet = rightFacePlate = secondary;
            break;

        case "6":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightHelmet = leftHelmet = primary;

            rightFacePlate = leftFacePlate = secondary;
            break;

        case "7":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightFacePlate = leftFacePlate = primary;

            rightHelmet = leftHelmet = secondary;
            break;

        case "8":
            leftChestArmour = leftChestUndersuit = leftAbs = leftLegArmour = leftLegUndersuit = leftCod = leftArmUndersuit = leftArmArmour = leftShoulder = leftBackVent = leftHelmet = leftFacePlate = primary;

            rightChestArmour = rightChestUndersuit = rightAbs = rightLegArmour = rightLegUndersuit = rightCod = rightArmUndersuit = rightArmArmour = rightShoulder = rightBackVent = camera = rightHelmet = rightFacePlate = secondary
            break;

        case "9":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightHelmet = leftHelmet = primary;

            rightFacePlate = leftFacePlate = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = secondary;
            break;

        case "10":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightCod = leftCod = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightHelmet = leftHelmet = primary;

            rightFacePlate = leftFacePlate = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = secondary;
            break;

        case "11":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightHelmet = leftHelmet = rightFacePlate = leftFacePlate = primary;

            rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = secondary;
            break;


        case "Default":
            rightChestArmour = rightChestUndersuit = leftChestArmour = leftChestUndersuit = rightAbs = leftAbs = rightLegArmour = leftLegArmour = rightLegUndersuit = leftLegUndersuit = rightCod = leftCod = rightArmUndersuit = leftArmUndersuit = rightArmArmour = leftArmArmour = rightShoulder = leftShoulder = rightBackVent = leftBackVent = camera = rightHelmet = leftHelmet = rightFacePlate = leftFacePlate = primary;
    }


    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 716 1868"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2
            }}
        >
            <g id="Artboard1" transform="matrix(0.821101,0,0,1.01082,-22.1697,-34.368)">
                {/* <rect x="27" y="34" width="872" height="1848" style="fill:none;" /> */}
                <g id="Right-Chest-Armour">
                    <g transform="matrix(1.21788,0,0,0.989293,405.76,599.876)">
                        <path d="M161,3L212.965,95.092L209.526,138.571L185.207,204L168.098,270.302L162.535,286L71.63,252L61.511,227.259L47,221L39,223L39,103L41.892,55C69.48,46.374 113.301,26.081 161,3Z"
                            style={{ fill: rightChestArmour }} />
                    </g>
                    <g transform="matrix(0.679981,0,0,0.387115,429.331,793.519)">
                        <path d="M295.09,69.667L297.049,107.104L289.535,147.47L276.731,174.791L267.696,174.791L228.514,143.43L215.836,100.333L215.836,69.667L224.925,69.667L232.788,77.236L278.705,102.889L287.312,69.667L295.09,69.667Z" style={{ fill: rightChestArmour }} />
                    </g>
                    <g transform="matrix(1.37011,0,0,1.19575,176.342,576.193)">
                        <path d="M311.444,48.763L322.178,48.763L335.108,66.872L354.878,100.074L347.745,127.876L311.444,189.41L287.682,184.217L263.417,177L235.864,174.527L221.222,167.072L218.952,122.912L238.117,122.912L243.736,135.411L251.863,137.219L258.027,127.876L259.462,102.228L251.863,87.354L245.41,84.318L238.117,90.582L238.117,122.912L218.952,122.912L222.738,84.318L226.111,75.237L235.864,66.872L311.444,48.763Z" style={{ fill: rightChestArmour }} />
                    </g>
                    <g transform="matrix(0.405959,0,0,0.662396,404.629,632.015)">
                        <path d="M298,81.416C298,81.416 311.33,114.522 311.83,126.968C312.22,136.675 301,156.091 301,156.091C285.278,165.51 269.245,164.391 253,156.091C244.38,131.942 239.981,107.128 241.306,81.416C253.842,67.481 272.378,66.688 298,81.416Z" style={{ fill: rightChestArmour }} />
                    </g>
                </g>
                <g id="Right-Chest-Undersuit">
                    <g transform="matrix(0.911279,0,0,0.544111,412.237,487.892)">
                        <path d="M188.682,124.818L182,223C137.061,264.669 91.563,292.396 45.014,293.909L45.014,202.889L54.369,205.48L76.986,195.984C115.598,171.269 148.76,141.835 163.738,96.658L188.682,124.818Z" style={{ fill: rightChestUndersuit }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,382.054,784.874)">
                        <path d="M182,103L192,199C133.464,235.639 84.969,234.117 39,223L39,65.668L46,49.487C58.738,35.151 62.57,32.015 69.294,34.165C77.485,36.784 87.546,48.217 92.726,69L145.448,87L182,103Z" style={{ fill: rightChestUndersuit }} />
                    </g>
                </g>
                <g id="Left-Chest-Armour" >
                    <g transform="matrix(1.21788,0,0,0.989293,250.48,636.48)">
                        <path d="M174.5,17L174.5,186L163.068,186L146.572,220.117L102.528,233.84L54.674,248.267L46.5,195L10.181,97L10.181,55.54L60.639,-36.38L174.5,17Z" style={{ fill: leftChestArmour }} />

                    </g>
                    <g transform="matrix(0.679981,0,0,0.387115,126.247,793.519)">
                        <path d="M325.09,69.667L328.672,97.778L310.892,147.015L276.864,174.791L264.194,174.791L251.657,151.569L242.754,80.767L251.657,64.556L266.733,97.778L325.09,69.667Z" style={{ fill: leftChestArmour }} />
                    </g>
                    <g transform="matrix(1.37011,0,0,1.19575,-17.9092,576.193)">
                        <path d="M249.667,46.281L330.85,71.198L336.352,81.233L321.173,87.266L312.518,84.436L302.542,96.07L298.877,119.5L305.209,135.032L311.403,137.586L318.442,131.508C322.886,117.555 323.473,102.735 321.173,87.266L336.352,81.233L340.634,149.185L337.771,165.13L333.222,171.209L305.209,177L285.257,178.655L261.916,187.755L247.013,187.755L232.778,165.13L207,114.31L204.751,98.194L210.947,88.92L234.556,48.763L249.667,46.281Z" style={{ fill: leftChestArmour }} />
                    </g>
                    <g transform="matrix(0.548045,0,0,0.593576,253.099,636.282)">
                        <path d="M303,75.333L309.22,105.084L300.778,165.333L291.083,172.121L269.667,172.121C251.93,148.567 245.559,119.421 276.333,72L303,75.333Z" style={{ fill: leftChestArmour }} />
                    </g>
                </g>
                <g id="Left-Chest-Undersuit" >
                    <g transform="matrix(1.21788,0,0,0.989293,241.346,447.525)">
                        <path d="M182,154.62L182,208L88,167L82,117L92.66,100.817L100.001,95.175L105.5,100.817L111.774,117L145.278,139.607L182,154.62Z" style={{ fill: leftChestUndersuit }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,218.207,777.949)">
                        <path d="M201,43L200,223L132.736,232.557L74.936,206.881L73,190L90,103L184.441,73.574C166.783,70.262 180.621,56.706 194.921,43L201,43Z" style={{ fill: leftChestUndersuit }} />
                    </g>
                </g>
                <g id="Right-Abs" transform="matrix(0.766248,0,0,1.66029,290.909,751.186)">
                    <path d="M344.589,72.725L343.524,77.839L317.869,98.936L337.158,109.866L313.34,129.622L324.819,140.311L328.695,148.995L301.241,158.057L277.723,161.405L242.603,172.342L223,172.342L223,87.238L237.305,60.212L344.589,72.725Z" style={{ fill: rightAbs }} />
                </g>
                <g id="Left-Abs" transform="matrix(1.21788,0,0,0.989293,98.2458,818.51)">
                    <path d="M288,33L294.5,41.23L298.5,76.942L294.5,223.975L232.5,188L232.5,175.805L241.94,149.622L228.491,122.015L228.491,112.184L241.94,98L223,62.393L223,54L288,33Z" style={{ fill: leftAbs }} />
                </g>
                <g id="Right-Leg-Armour" >
                    <g transform="matrix(1.21788,0,0,0.989293,232.821,1542.67)">
                        <path d="M326.282,-30.171L332.964,-18.992L326.282,-2.421L347.65,80.762L353.587,80.762L368.297,47.5L372,48.767L372,80.762L363.642,94.036L363.642,107.402L365,109L364,114.41L367.752,116.814L368.297,129.671L361.473,141.302L362.468,154L371.297,166.315L376.297,166.315L385.153,150L389.186,151.31L401.417,189.986L400,198.619L392.069,200.216L386.466,191.119L377.419,192.305L368.297,188.721L352.577,188.721L326.282,196.511L299.613,212.277L283,220.952L276,220.952L260.713,203.725L260.713,197.619L283,150L286.771,134.263L277,52L285,53.5L289.643,53.5L304.255,32.45L314.402,8.372L321.302,-30.171L326.282,-30.171Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.182682,0,0,0.223666,640.984,1645.05)">
                        <path d="M343,62L343,125.492L285.129,210.948L263,238.923L245.713,241.135L212.38,205.75L205.713,170.365L219.046,152.673L273.356,117.584L326.217,62L343,62Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.416108,0,0,0.292487,585.772,1602.69)">
                        <path d="M287.39,1.118L290.862,4.5L290.862,65.117L281.056,105.971L243.488,160.088L223,166.853L228.854,105.971L287.39,1.118Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.649534,0,0,0.989293,374.176,1400.71)">
                        <path d="M373,87L373,127.154L359.813,154.95L324.25,192L314.745,190.925L297.43,179.582L241.75,132L234.613,112.563L232.961,100.809L231.242,77.819L238.768,57.992L251.125,38L272.705,46.676L300.634,60.48L336.641,75.988L373,87Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.740875,0,0,1.57427,440.276,994.939)">
                        <path d="M282.178,27.437L291.114,48.15L308.421,61.417L325.002,74.89L340.135,91.126L351.059,106.89L365.401,130.239L368.058,145.028L351.059,146.269L334.781,160.661L332.88,172.601L333.355,175.122L335.606,191.458L343,194.602L354.322,197.109L354.322,198.193L349.5,210.92L343,217.179L279.186,190L239.438,172.601L226.288,163.175L219.045,156.016L199.907,122.472L179.015,90.497L163.822,72.055L162.178,67.656L210.3,55.861L240.118,46.823L255.877,41.262L268.071,34.852L277.247,26.809L282.178,27.437Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.537896,0,0,0.731217,509.898,1461.72)">
                        <path d="M349.792,79.588L346.854,111.765L327.573,144.205L299.981,190.529L275.075,204.059L235.728,116.676L233.072,96.049L240.723,84.645L269.691,70.346L308.029,68.374L334.365,70.346L349.792,79.588Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.263873,0,0,0.989293,647.732,1368.06)">
                        <path d="M223,56L278.923,95.784L285.915,108L302.888,130.281L232.231,179C224.452,180.804 220.791,181.332 209.154,181L212.608,151.31L171.485,142.745L182.761,115.93L225.783,95.784L190.692,62L190.692,51L223,56Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.740875,0,0,0.989293,431.751,1278.04)">
                        <path d="M328.205,65L356.151,100.54L359.438,128.227L336.425,161L304.205,189.48L277.247,199L257.862,191.78L227.932,173L204.918,148.789L208.205,116.136L244.37,65L263.236,46.084L283.674,38L300.091,44.954L328.205,65Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.446555,0,0,0.989293,417.005,1147.45)">
                        <path d="M283,24L359.276,118.893L373,145.862L373,159L310.952,223.031L302.091,228L191.521,105.438L182.091,84L258.63,24L270.076,18.458L283,24Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.235315,0,0,0.421525,640.984,1214.8)">
                        <path d="M348.176,66.694L354.349,83.035L363.369,105.418L361.545,139.449L343,177L299.708,198.122L241.766,196.08L223,177L228.176,54.959L246.942,40.711L263.21,31.49L290.78,25.623L320.489,38.201L348.176,66.694Z" style={{ fill: rightLegArmour }} />
                    </g>
                    <g transform="matrix(0.235315,0,0,0.249474,609.039,1049.38)">
                        <path d="M255.016,58.034L301.596,137.345L274.755,153.207L231.184,80.682L223,50.103L255.016,58.034Z" style={{ fill: rightLegArmour }} />
                    </g>
                </g>
                <g id="Left-Leg-Armour" >
                    <g transform="matrix(1.21788,0,0,0.989293,1.42458,1542.67)">
                        <path d="M289,52L289.07,56L285.069,76.607L281.114,119L281.114,135.514L283.586,147.348L307.197,201.814L293,217L289,222.231L279.114,218.787C263.845,207.148 232.599,191.797 210.409,189.415C192.943,187.541 185.663,197.126 165,199.528L165,188.394L177.35,150.89L181.938,148.479L191.021,165.801C200.59,160.483 204.936,149.651 204.936,149.651L204.936,138.504L199,127L199,117L202,115L202,109.347L204.038,107.779L204.936,104.258L204.038,91.494L196,79L195,60.676L195,48L198.688,48L218.424,80.904L227.266,52L240.302,6.933L241,-8L236,-22L243.5,-30.655L244.93,-28.614L252.695,12.964L262.053,34.161L274.741,55.247L281.114,56L289,52Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.639385,0,0,0.266679,6.81369,1634.96)">
                        <path d="M375.381,169.581L375.381,206.677L362.824,243.925L354.429,240.065L332.152,138.089L335.381,80.548L375.381,169.581Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.20298,0,0,0.447333,172.942,1575.28)">
                        <path d="M253,68.635L255.286,85.52L350.634,135.654L364,168.154L325,168.154L248.045,131.028L223,101.808L223,62L253,68.635Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.481125,0,0,0.989293,247.318,1138.05)">
                        <path d="M367.26,90.504L367.26,102.595L261.998,234L253.376,232L192.624,166L196.271,145.749L234.573,92.998L247.962,74.718L275.364,37.21L291.345,28L307.68,44.633L367.26,90.504Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.304469,0,0,0.860255,122.299,1376.56)">
                        <path d="M347,52.8L311,100.678L347,122.478L359.688,154.691L327,164.669L327,201.15L311,198.85L246.058,147.412L259,112.6L271.904,87.029L327,49.018L347,52.8Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.481125,0,0,0.679602,123.095,1478.77)">
                        <path d="M289.842,48.899L307.704,52.637L338.452,69.278L345.113,86.005L336.302,109.902L294.905,188.646L288.403,191.934L276.158,175.544L238.266,124.697L217.937,91.828L214.336,71.541L217.937,57.633L239.846,51.442L252.756,48.899L271.67,52.637L293.973,56.121L289.842,48.899Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.740875,0,0,0.989293,144.941,1402.69)">
                        <path d="M343,62L343,106.5L337.74,125.5L306.591,161.786L272.315,188L260.974,190.103L235.857,159.629L227.932,146L219.712,121.849L219.712,84L265.974,67.874L309.558,41.812L314.961,42.916L327.064,35.67L343,62Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.766248,0,0,0.989293,59.5122,1279.52)">
                        <path d="M298.497,38L322.299,59.107L349.891,93.091L366.046,130L366.046,146.288L352.814,161.78L327.642,182.953L301.675,196L283.132,193.521L243.968,161.78L219.821,130L219.821,108.402L233.388,82.728L269.093,49L287.95,38L298.497,38Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,-59.4693,1039.12)">
                        <path d="M349,63L307,231L237.455,300.937L232.623,287.554L231.3,269.68L238,266.429L243,257L243,237.519L239.619,201.261L231.738,189.677L220,185L228.093,135.615L239.619,94.124L252.691,63L268.187,29.199L274,-3L278.697,-3L292.136,20.895L322.194,45.859L349,63Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.235315,0,0,0.421525,147.971,1213.32)">
                        <path d="M343,62L348.176,121.788L348.176,177C331.342,220.127 291.527,214.469 228.176,177C228.176,177 210.891,137.932 210.028,118.765C209.177,99.843 223,62 223,62C278.293,22.289 319.742,18.529 343,62Z" style={{ fill: leftLegArmour }} />
                    </g>
                    <g transform="matrix(0.0932291,0,0,0.154846,225.428,1059.2)">
                        <path d="M377.617,17.278L377.617,51.448L277.684,164.222L236.063,174.582L225.051,122.322L340.569,23.667L377.617,17.278Z" style={{ fill: leftLegArmour }} />
                    </g>
                </g>
                <g id="Right-Cod" transform="matrix(1.21788,0,0,0.989293,-936.95,729.473)">
                    <path d="M1284,246L1291.76,253.263L1295,293.578L1219.4,343.892L1194.3,416.679C1180.4,447.1 1165.4,460.288 1149.5,459.5L1135,455.382L1135,311L1155.91,313.975L1187.5,293.578L1256.54,266.95L1284,246Z" style={{ fill: rightCod }} />
                </g>
                <g id="Left-Cod" transform="matrix(1.21788,0,0,0.989293,-1250.55,729.473)">
                    <path d="M1407,311L1407,459.5L1384.11,453L1366.22,425.467L1335.07,343.844L1262,293.948L1262,254.5L1273,246L1280.61,254.5L1293.14,264.102L1366.22,293.948L1398.5,313.975L1407,311Z" style={{ fill: leftCod }} />
                </g>
                <g id="Right-Leg-Undersuit" >
                    <g transform="matrix(1.21788,0,0,0.989293,327.816,1684.14)">
                        <path d="M290,55.619L311.186,65.722L323.686,102.618L384.148,147.861L403,161.567L403,171L257,171L242.913,147.861L208.744,111.962L202,102.618L202,82L232.163,65.722L265,55.619L290,55.619Z" style={{ fill: rightLegUndersuit }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,231.603,1164.76)">
                        <path d="M331,-137L334.391,-130.578L332.772,-123.419L326.798,-112.874L265.526,-64.228L281.469,-2.331L309.089,101.838L339.529,136.77L352,154L344.577,154L333.936,149.468L320.386,161.199L298.615,200.027L286.79,240.444L285.502,262.445L290.198,277L317.328,308.395L331,316L342.373,315.313L354,306L377,274L380,274L380,295.283L374.447,340.341L373,342L336,355L323.058,343L320.307,323.534L317.328,321.968L283.09,297.785L257,269L267.957,211.234L292.918,142.382L290.198,113.309L254.412,-0L248.187,-2.331L228.422,34.445L216,11L231,-7L247.058,-47.175L261.431,-94.606L331,-137Z" style={{ fill: rightLegUndersuit }} />
                    </g>
                </g>
                <g id="Left-Leg-Undersuit" >
                    <g transform="matrix(1.21788,0,0,0.989293,-83.8268,1684.14)">
                        <path d="M357,84L353.69,105.987L313.023,146.061L311,154L300.233,168.03L157,169L157,160.985L194,138L214.693,120.463L242.797,105.987L240.171,92.194L250.88,64.069L266,56.528L298.5,56.528L331.15,68.069L357,84Z" style={{ fill: leftLegUndersuit }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,-11.9721,964.925)">
                        <path d="M236.485,352.163L227,357L229.005,352.163L275.474,293.738L313.134,135.523L252.717,91L243,69.975L248,65L316.671,107.343L343,177L362.772,213.389L353.033,233.059L347.517,237.5L330.678,198.786L321.158,206.664L286.633,312.836L284.662,342.889L293,369.103L307.114,399.354L321.158,475.189L299.671,496.947L258,527L256.598,542.46L244.223,556.363L239.732,557.961L230.918,551.05L216.287,546.23L204.191,546.23L198.577,495.699L198.577,476.083L201.296,475.189L222.31,505.31L238,518L244.223,518L259.414,510.764L288.96,478.908L293.795,467.615L294,443L291.468,433.377L259.414,361.376" style={{ fill: leftLegUndersuit }} />
                    </g>
                </g>
                <g id="Right-Arm-Undersuit" >
                    <g transform="matrix(0.4973,0,0,0.989293,599.331,666.653)">
                        <path d="M323.408,53L374.837,173C310.67,195.335 194.966,199.142 173.286,183.607C170.97,181.947 173.371,179.078 173.286,177C198.995,178.497 221.181,178.654 225.449,172C280.679,154.672 264.908,52.188 181.367,22.5L181.367,16.5L323.408,53Z" style={{ fill: rightArmUndersuit }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,488.575,1055.45)">
                        <path d="M295,36.5C296.002,61.349 293.409,85.856 287,110L249,158C218.598,139.284 196.485,121.637 220.943,110C210.549,104.375 207.354,97.85 211.076,90.46C195.83,96.92 203.187,65.331 209.5,35.5C243.18,29.272 271.907,29.318 295,36.5Z" style={{ fill: rightArmUndersuit }} />
                    </g>
                </g>
                <g id="Left-Arm-Undersuit" >
                    <g transform="matrix(0.4973,0,0,0.989293,43.2035,667.148)">
                        <path d="M386.193,16L386.193,23.52L338.025,47.937L321.246,71L310.246,120L310.246,151.645L340.859,175.343L361.716,178.668L393.951,177L393.951,184.751L357.762,187.529L290.682,187.529C264.605,185.566 240.439,182.762 223,177L194.594,170.584L242.592,49L386.193,16Z" style={{ fill: leftArmUndersuit }} />
                    </g>
                    <g transform="matrix(0.81391,0,0,0.942581,-101.154,1030.57)">
                        <path d="M349.995,68.297L349.995,80.87L357.052,104.119L354.335,121.772L343,135.47L343,163.356C311.823,192.272 281.341,209.602 254.423,167.554C228.592,149.357 216.149,114.335 215.812,64.099C279.364,54.326 327.873,53.481 349.995,68.297Z" style={{ fill: leftArmUndersuit }} />
                    </g>
                </g>
                <g id="Right-Arm-Armour" >
                    <g transform="matrix(0.619088,0,0,0.36991,568.519,628.385)">
                        <path d="M329.23,96.767C335.306,157.965 340.816,218.117 323.328,235.837L205.295,147.581C197.875,127.7 203.461,117.249 221.033,115.488L255.335,147.581L329.23,96.767Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.456704,0,0,0.989293,545.054,654.782)">
                        <path d="M313.667,37.5C404.251,79.256 407.009,139.436 375,171C353.372,191.347 320.044,190.553 276.333,171C236.361,143.587 224.646,115.727 255.944,87.185L268.333,39L313.667,37.5Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.224727,0,0,0.64089,729.534,654.123)">
                        <path d="M261.71,60.456C300.42,88.157 321.876,122.796 256.29,192.436L215.854,203.212L154.144,103.778L206.7,99.819L233.839,58.913L261.71,60.456Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.182682,0,0,0.989293,770.575,780.422)">
                        <path d="M323,83C364.192,106.62 375.53,133.972 369.667,163.474L263,188C249.081,147.213 230.141,105.042 218.978,67.792C218.09,64.829 219.796,61.897 218.978,59L323,83Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.405959,0,0,0.989293,629.443,806.638)">
                        <path d="M121,51.519L190.379,76.255L307.092,111.908L317.218,127.223L325,160L317.218,177C254.474,174.387 199.01,163.199 149.5,145C136.219,139.775 168.93,138.069 209.63,136.974C192.827,112.67 176.799,88.321 109,67L121,51.519Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.224727,0,0,1.64309,730.752,784.405)">
                        <path d="M354.999,62C374.827,73.523 375.219,85.839 364.421,100.623L378.563,126.123C414.113,150.922 477.532,167.258 559.774,177.878L559.774,183.601C368.53,181.904 195.746,182.631 38.742,185.429C-22.056,182.833 -16.006,172.81 38.742,157.376L-34.338,120.102C-26.269,118.322 28.131,120.424 132.336,122.73L150.027,106.789L132.336,82.326L-149.111,50.861L-188.169,44.551C26.349,45.241 189.73,40.54 304.29,30.691L336.39,38.519L354.999,62Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.0507449,0,0,0.309692,830.444,870.043)">
                        <path d="M343,93.944L343,148.25L271,157.833L247,71.583L343,93.944Z" style={{ fill: rightArmArmour }} />
                    </g>
                    <g transform="matrix(0.405959,0,0,0.455935,562.46,853.556)">
                        <path d="M313,75.019L367,172.66C363.874,197.786 345.698,202.437 307,179.17C276.923,153.577 262.434,121.542 262,83.698C264.731,44.988 281.473,41.446 313,75.019Z" style={{ fill: rightArmArmour }} />
                    </g>
                </g>
                <g id="Left-Arm-Armour" >
                    <g transform="matrix(0.4973,0,0,0.989293,110.221,647.857)">
                        <path d="M298.918,67.437L325.832,123.264L294.02,174C247.816,197.671 210.286,202.327 188.714,172C180.617,120.038 187.014,79.914 223,63.953C249.624,41.572 261.234,42.65 275.387,43.396C289.125,44.12 305.986,45.069 298.918,67.437Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.4973,0,0,0.989293,-26.0487,632.028)">
                        <path d="M350.347,88L371.94,90.42L343,152L335.653,151L315.702,124.082L310.085,91.224L325.857,62.897L335.653,61L350.347,88Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.384673,0,0,0.662396,80.3208,865.439)">
                        <path d="M427.696,-3.449L434.434,-2.147L431.648,9.736L422.649,13.866L400.516,28.004L377.507,47.82L355.284,72.955L336.287,102.398L333.121,115.84L355.284,121.814L399.031,121.299L392.912,133.615L320.161,162.138L273.425,171.407L241.688,174.013L223,177C217.18,148.581 214.416,118.864 223,84.329C268.481,55.442 340.429,29.516 427.696,-3.449Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.253724,0,0,0.989293,27.6597,780.916)">
                        <path d="M343,62L309.4,131.24L309.4,184.902L275.758,181L253.746,164.77L239.142,151.563L239.142,116.339L275.758,81.138L295.969,77.19L323.8,63L343,62Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.480231,0,0,1.95108,-3.92995,734.641)">
                        <path d="M500.233,63.521L474.418,70.045L361.981,89.822L349.699,93.85L343,102.788L343,123.687L349.699,128.675L376.98,128.675L427.762,126.11L398.806,143.495L389.301,150.737L411.286,176.235L392.886,181.483L358.216,178.014L242.634,177.147C212.42,179.825 182.206,179.45 151.991,179.18L151.991,176.235L166.009,172.289L222.811,148.326L238.425,136.143L238.425,115.494L242.634,88.374C244.082,74.099 254.171,62.216 266.112,50.845C308.886,59.397 386.58,63.665 500.233,63.521Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.710428,0,0,0.208987,-13.9004,657.261)">
                        <path d="M339.571,71.468L344.714,110.727L334.242,132.498L297.918,189.323L243.258,274.23L231.337,248.495L231.337,43.065L247.654,48.753L294.777,118.902L325,75.713L339.571,71.468Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.253724,0,0,0.351857,-2.78724,865.945)">
                        <path d="M328.6,73.247L338.2,157.319L309.4,157.319L304.6,73.247L328.6,73.247Z" style={{ fill: leftArmArmour }} />
                    </g>
                    <g transform="matrix(0.384673,0,0,0.43873,155.483,855.564)">
                        <path d="M257.518,82.294C261.6,125.86 241.83,159.688 203.696,186.02C168.423,199.217 148.466,198.329 153.867,174.123C166.76,134.857 183.306,108.026 200.838,84.549C236.44,35.236 253.836,38.837 257.518,82.294Z" style={{ fill: leftArmArmour }} />
                    </g>
                </g>
                <g id="Right-Shoulder" >
                    <g transform="matrix(1.21788,0,0,0.989293,364.352,498.455)">
                        <path d="M412,84C403.665,101.417 390.04,119.826 367,140C355.919,150.987 333.925,164.785 298,182.171L285.542,168.281L271.927,172.257L258.129,191L241.629,191L194,94C196.32,92.285 194.654,89.668 197,88.143C226.919,68.71 262.923,65.497 296,69.115C310.208,93.076 360.386,87.683 388.408,75.487L412,84Z" style={{ fill: rightShoulder }} />
                    </g>
                    <g transform="matrix(0.761173,0,0,0.283884,496.339,592.554)">
                        <path d="M341.4,131.697C362.456,176.093 356.501,194.485 335,197.909C301.156,203.966 266.386,180.968 231,138.667C216.158,105.808 219.095,81.007 250.2,68.97C281.995,70.51 312.073,95.894 341.4,131.697Z" style={{ fill: rightShoulder }} />
                    </g>
                    <g transform="matrix(0.761173,0,0,0.147187,564.845,548.597)">
                        <path d="M335,66.098C356.231,110.619 359.14,152.554 333.4,190.443C290.512,225.603 255.929,227.41 231,190.443C214.349,141.351 212.938,97.827 232.6,62C265.796,35.028 299.83,33.378 335,66.098Z" style={{ fill: rightShoulder }} />
                    </g>
                </g>
                <g id="Left-Shoulder" >
                    <g transform="matrix(2.13128,0,0,0.501473,-412.516,547.224)">
                        <path d="M343.364,75.402L345.605,89.051L332.864,181.692L321.296,257.884L315.523,280.254L308.946,280.254L303.099,247.088L299.276,237.373L292.302,237.373L284.182,260.53L256.664,209.217L239.682,153.938L223,84.28L223,62L235.996,54.99C241.156,63.689 248.971,69.424 260.714,70.772C268.958,74.157 278.843,64.548 284.182,53.23L287.143,37.569L297.746,33.53L323.938,48.929L343.364,75.402Z" style={{ fill: leftShoulder }} />
                    </g>
                    <g transform="matrix(0.630425,0,0,0.200225,-38.2244,543.933)">
                        <path d="M350.727,71.882C352.29,74.719 355.771,77.556 357.269,80.394C372.53,109.302 380.455,138.21 343,167.118C305.467,193.441 265.956,189.419 224.932,162.177C200.326,136.56 195.364,107.544 228.796,71.882C280.463,43.688 320.439,45.395 350.727,71.882Z" style={{ fill: leftShoulder }} />
                    </g>
                    <g transform="matrix(0.758778,0,0,0.232269,-5.80527,603.282)">
                        <path d="M331.765,44.963C349.029,60.296 352.716,83.349 344.605,113.111C316.741,161.475 286.953,188.962 255.101,194.037C212.087,207.614 205.94,180.201 227.815,121.63C265.227,59.882 300.153,30.714 331.765,44.963Z" style={{ fill: leftShoulder }} />
                    </g>
                </g>
                <g id="Right-Back-Vent" transform="matrix(0.761173,0,0,0.283884,422.353,504.597)">
                    <path d="M403.8,55.03C415.264,74.3 420.755,114.111 423.063,164.866L397.4,194.424L231,194.424L197.838,119.5C196.546,104.54 209.413,75.874 221.4,48.061L226.2,18.568L389.71,19.766L403.8,55.03Z" style={{ fill: rightBackVent }} />
                </g>
                <g id="Left-Back-Vent" transform="matrix(1.35996,0,0,0.494647,-126.299,470.984)">
                    <path d="M353.746,130L335.836,183L241.358,178.593L227.478,169C224.723,136.626 227.262,112.126 236.305,98.573L240.067,95.919L243.597,79.147L335.836,79.147L338.122,91.874L353.746,130Z" style={{ fill: leftBackVent }} />
                </g>
                <g id="Camera" transform="matrix(0.537896,0,0,0.464538,569.491,370.743)">
                    <path d="M453.943,62C497.608,102.222 502.965,140.787 453.943,177L136.962,177C73.956,158.433 75.741,118.771 123.532,64.13C124.413,63.414 119.382,47.093 119.382,47.093L151.55,16.304C178.379,5.011 197.356,2.066 200.172,16.304C228.735,-11.7 347.793,-28.691 453.943,62Z" style={{ fill: camera }} />
                </g>
                <g id="Right-Helmet" transform="matrix(1.21788,0,0,3.59452,190.804,-37.3439)">
                    <path d="M275,47.964L279.245,56.019L285.246,56.019L290.394,64.709L285.246,70.186L312.617,87.242L329.22,100.566L331.86,119.696L329.22,126.712L331.86,127.67L336.492,130.746L334.672,136.375L321.916,140.873L331.86,143.827C331.86,143.827 334.294,150.033 329.22,152.86C323.743,155.912 299,162.138 299,162.138C299,162.138 298.308,163.335 291.938,165.182C284.099,167.455 269.718,170.572 262.412,171.938C255.943,173.147 241.988,175.643 233.056,176.59C223.695,177.583 219.5,177 219.5,177L219.828,62.232L227.542,61.987L245.176,57.918L269.442,48.884L275,47.964Z" style={{ fill: rightHelmet }} />
                </g>
                <g id="Left-Helmet" transform="matrix(1.21788,0,0,0.989293,117.123,230.869)">
                    <path d="M284,-45L284,373.62L266.539,366.669L212.612,329.62L209.605,316.605L198.5,313.615L176.859,284.456L174,267.669L174,250L185,243L181.312,230C181.312,230 171.522,224.379 170.304,217.555C169.202,211.39 174,189.059 174,189.059L174,125.814L181.267,79.436L206.721,14.079L225,-29.565L215.506,-37.693L219.121,-59.141L229,-102L256.499,-68.863L281,-46L284,-45Z" style={{ fill: leftHelmet }} />
                </g>
                <g id="Right-Face-Plate" transform="matrix(1.21788,0,0,0.989293,-975.922,117.326)">
                    <path d="M1272,290.272L1264.66,357.482L1239.84,376.602L1228,438.5L1204.04,456.772L1193.22,459.5L1181,451.11L1167,459.5L1171.75,341.272L1195,337.693L1224.31,349.421L1239.84,335.946L1259.81,294.84L1272,290.272Z" style={{ fill: rightFacePlate }} />
                </g>
                <g id="Left-Face-Plate" transform="matrix(1.21788,0,0,0.989293,-1069.09,114.627)">
                    <path d="M1257.5,344L1258,453.5L1245.09,462.228L1237.44,462.228L1210,441.5L1198.21,380.145L1175.77,362.598L1165,293L1181.4,300.786C1189.41,369.948 1240.72,350.091 1248.25,344C1248.25,344 1255.75,344.61 1257.5,344Z" style={{ fill: leftFacePlate }} />
                </g>
                <g id="Metal">
                    <g transform="matrix(0.537896,0,0,0.464538,548.787,424.164)">
                        <path d="M381.491,68.389L377.18,110.367L350.91,115.465L338.472,189.778L325.366,189.778L322.647,184.331L256.962,179.13L213.929,179.13L222.144,164.222L231.037,120.411L196.201,106.722L198.249,68.389L381.491,68.389Z" style={{ fill: metal }} />
                    </g>
                    <g transform="matrix(0.279901,0,0,0.32066,703.75,323.991)">
                        <path d="M329.947,74.341L329.947,192.002L231.702,158.489L240.404,108.278L281.453,108.278L297.265,74.341L329.947,74.341Z" style={{ fill: metal }} />
                    </g>
                    <g transform="matrix(1.21788,0,0,0.989293,269.358,582.069)">
                        <path d="M260,80L275.328,65L286.392,80L285.096,88.795L280.358,93L272.659,88.795L263.621,83.342L252.13,83.342L244,91L244,106.835L248.163,118.199L260,138L280.358,156.412L292,160.043L292,166L286.392,169.213L275.328,170.572L263.621,163.396L256.318,169.213L245,169.213L244,154.593L246.405,142.686L234.545,114.143L231,86L246.405,75.749L260,80Z" style={{ fill: metal }} />
                    </g>
                </g>
                <g id="Accessories" transform="matrix(1.21788,0,0,0.989293,-171.514,20.1499)">
                    <g transform="matrix(0.416667,0,0,0.408696,353.083,377.661)">
                        <path d="M350.2,130.511L350.2,140.245L312.895,159.872L297.4,159.872L259,128.064L235,73.186L235,57.106L350.2,130.511Z" style={{ fill: accessories }} />
                    </g>
                    <g transform="matrix(0.416667,0,0,0.408696,447.083,377.661)">
                        <path d="M343,62L321.4,120.723L283.508,159.872L263.8,159.872L223,135.404L343,62Z" style={{ fill: accessories }} />
                    </g>
                    <g transform="matrix(0.533333,0,0,0.763211,483.067,598.912)">
                        <path d="M286.75,77.723C309.949,93.722 328.318,110.873 333.625,131.141C339.179,162.003 325.465,170.648 296.125,161.277C266.88,147.649 244.916,127.737 230.5,101.308C226.597,69.994 243.547,60.27 286.75,77.723Z" style={{ fill: accessories }} />
                    </g>
                    <g transform="matrix(0.682381,0,0,4.22196,285.943,912.238)">
                        <path d="M348.862,63.184L339.207,138.723L328.326,138.723L326.414,160.449L292.146,161.42L288.778,175.342L208.345,175.342L220.011,159.028L266.175,145.443L272.598,141.044L272.598,130.442L259.014,124.315L249.207,121.179L237.526,115.505L238.852,109.894L301.967,74.945L297.587,72.472L292.146,69.356L297.587,63.184L310.927,61.053L348.862,63.184Z" style={{ fill: accessories }} />
                    </g>
                    <g id="Back" transform="matrix(0.441667,0,0,0.469565,607.44,346.387)">
                        <path d="M435.83,117.37C456.887,141.304 463.16,162.046 442.623,177L161.868,177C115.353,175.233 106.288,156.358 155.23,110.981C241.524,58.092 332.482,40.648 435.83,117.37Z" style={{ fill: accessories }} />
                    </g>
                    <g id="Hair" transform="matrix(1,0,0,1,237.5,-13)">
                        <path d="M347,71L355.785,83.25L334.479,124.043L293.45,173.033L283,179L271,173.033L255.381,153.951L211,89.25L211,75L226.87,71L230.441,63.776L283,52L299.5,57.982L334.479,62L347,71Z" style={{ fill: accessories }} />
                    </g>
                </g>
                <g transform="matrix(1.21788,0,0,0.989293,-171.514,20.1499)">
                    <g transform="matrix(1,0,0,1,517,34)">
                        <path d="M0,0L9,1L19,6L22,7L38,9L43,12L46,11L55,11L61,14L63,16L64,20L74,22L77,26L79,32L79,43L67,63L63,76L62,83L62,95L68,107L73,122L74,127L74,142L71,152L69,158L75,176L82,192L89,206L101,236L110,263L115,286L117,306L116,344L114,366L119,377L121,389L119,402L114,410L107,416L105,418L115,425L117,427L117,438L114,458L161,458L163,452L167,442L168,432L161,431L159,426L157,425L156,413L156,408L147,408L139,404L132,397L127,384L126,375L128,367L134,358L137,354L139,343L146,332L149,329L151,329L152,326L161,320L171,317L186,317L194,318L206,315L214,314L223,314L240,317L251,320L254,304L264,303L265,294L268,292L280,292L283,295L283,336L282,339L286,341L289,343L304,358L309,365L311,371L311,382L307,394L303,400L295,406L291,408L247,407L247,423L245,431L243,432L234,432L234,442L232,457L229,465L227,467L228,472L234,481L238,499L239,501L268,502L284,504L306,512L316,520L334,526L342,531L341,536L337,542L329,552L319,566L310,576L305,582L301,586L288,598L280,605L272,611L264,615L266,620L268,629L276,646L280,660L282,674L282,684L280,707L275,727L270,743L268,747L268,755L271,766L297,792L306,806L311,820L317,829L324,843L327,857L327,872L323,888L319,896L312,904L308,916L300,934L299,937L299,954L302,972L305,983L312,998L319,1014L335,1038L334,1044L330,1049L327,1050L325,1062L324,1089L322,1105L315,1129L310,1137L302,1145L292,1158L280,1174L277,1177L270,1177L257,1169L240,1155L232,1145L230,1139L231,1128L233,1121L224,1109L220,1101L220,1087L224,1068L228,1058L228,1053L220,1043L217,1038L217,1027L222,1007L223,1001L223,984L217,961L212,947L206,930L192,918L185,908L180,892L170,872L167,859L167,847L171,834L172,809L174,801L177,798L180,798L180,792L172,783L165,771L160,758L156,738L147,759L145,762L145,767L149,773L150,776L150,788L146,804L143,812L136,821L131,824L127,838L122,843L120,844L121,853L129,883L136,913L137,924L142,925L150,931L153,938L154,976L155,986L162,989L165,996L166,1005L176,1014L183,1023L187,1030L188,1034L188,1051L186,1054L184,1054L194,1077L203,1105L211,1138L215,1159L216,1180L222,1191L226,1203L226,1231L222,1247L218,1255L209,1264L205,1289L201,1302L197,1306L191,1305L186,1301L179,1293L181,1297L190,1311L196,1323L202,1341L203,1346L203,1375L208,1383L215,1398L223,1424L226,1445L226,1465L223,1479L217,1496L208,1518L199,1535L194,1543L194,1546L202,1550L210,1561L211,1564L211,1586L207,1599L205,1603L206,1609L208,1619L209,1638L215,1665L224,1693L224,1703L219,1708L211,1713L212,1720L216,1730L227,1746L251,1770L263,1779L277,1788L293,1798L299,1802L301,1806L301,1817L299,1821L296,1823L152,1824L146,1820L139,1813L128,1795L121,1786L113,1777L99,1766L93,1759L89,1751L88,1746L88,1732L84,1730L78,1724L78,1722L76,1722L68,1711L67,1709L67,1702L75,1686L85,1663L91,1646L93,1637L92,1617L86,1568L81,1544L73,1530L57,1504L52,1493L48,1476L47,1459L47,1439L50,1421L55,1404L62,1390L67,1384L73,1355L73,1341L53,1281L44,1256L32,1215L28,1203L27,1197L27,1187L32,1173L34,1169L32,1155L28,1142L24,1141L16,1146L10,1148L9,1179L6,1328L3,1392L2,1465L-3,1468L-5,1468L-5,1553L-7,1558L-11,1560L-14,1558L-21,1558L-27,1561L-30,1561L-30,1620L-36,1623L-52,1623L-56,1624L-86,1626L-86,1640L-82,1654L-73,1676L-61,1701L-60,1708L-65,1716L-74,1726L-81,1733L-82,1749L-86,1758L-91,1765L-104,1775L-115,1786L-124,1799L-133,1813L-138,1819L-140,1819L-140,1821L-145,1824L-289,1823L-294,1818L-294,1805L-290,1800L-272,1789L-257,1779L-247,1772L-236,1761L-228,1754L-219,1744L-209,1729L-203,1713L-209,1711L-217,1704L-218,1702L-218,1695L-211,1673L-205,1651L-203,1640L-202,1622L-199,1607L-198,1603L-202,1595L-205,1582L-205,1567L-202,1558L-193,1548L-188,1546L-189,1540L-196,1529L-205,1510L-216,1481L-219,1469L-219,1441L-216,1422L-208,1396L-200,1380L-196,1374L-197,1366L-197,1352L-194,1335L-186,1315L-176,1299L-172,1293L-184,1305L-190,1306L-195,1301L-199,1287L-202,1265L-207,1260L-213,1253L-219,1235L-220,1221L-220,1208L-218,1198L-214,1188L-210,1182L-209,1163L-205,1139L-201,1124L-195,1100L-187,1076L-179,1058L-178,1055L-181,1052L-182,1047L-182,1038L-180,1030L-175,1020L-164,1008L-159,1005L-158,993L-154,988L-148,987L-148,970L-147,961L-146,935L-143,930L-134,924L-131,923L-128,906L-124,889L-114,851L-112,844L-118,842L-122,834L-123,824L-129,822L-137,811L-140,802L-143,792L-143,774L-138,766L-140,759L-147,745L-149,739L-152,752L-156,765L-164,781L-173,791L-173,797L-168,800L-166,805L-165,822L-165,832L-161,845L-160,855L-163,870L-167,880L-173,890L-177,904L-182,914L-193,925L-199,929L-205,945L-213,969L-217,987L-217,998L-213,1017L-210,1030L-211,1039L-219,1050L-222,1054L-220,1063L-216,1074L-213,1090L-213,1098L-216,1107L-226,1120L-225,1126L-224,1129L-224,1141L-227,1147L-236,1157L-249,1168L-261,1176L-270,1177L-275,1173L-287,1156L-298,1143L-303,1138L-309,1128L-316,1103L-317,1096L-319,1059L-321,1050L-325,1048L-328,1043L-328,1037L-319,1024L-310,1009L-297,978L-293,958L-293,935L-303,912L-307,901L-314,894L-318,884L-320,875L-320,853L-316,839L-307,823L-303,817L-299,805L-291,793L-283,784L-278,780L-273,775L-266,767L-264,767L-261,753L-261,748L-265,739L-270,722L-273,710L-276,678L-273,657L-268,642L-261,628L-259,619L-258,615L-269,609L-279,600L-294,586L-306,574L-317,560L-327,546L-331,542L-336,534L-334,529L-323,524L-309,520L-301,513L-286,507L-274,503L-262,502L-232,502L-228,483L-224,475L-215,465L-210,459L-200,458L-108,458L-111,429L-108,424L-99,418L-98,416L-102,415L-108,410L-113,400L-114,396L-114,383L-111,373L-108,368L-108,360L-109,354L-110,325L-110,299L-107,279L-101,254L-91,227L-81,203L-70,180L-64,164L-63,154L-67,145L-68,132L-66,121L-60,104L-55,94L-56,79L-60,64L-73,42L-73,35L-70,25L-66,21L-57,21L-56,15L-52,12L-48,11L-39,11L-36,12L-31,9L-15,7L-8,4L0,0ZM-5,8L-12,15L-25,14L-30,16L-31,20L-29,26L-34,22L-37,18L-45,17L-48,19L-48,27L-44,44L-43,51L-38,49L-34,46L-38,34L-36,34L-35,39L-32,44L-27,42L-24,40L-25,35L-23,35L-21,38L-15,36L-13,35L-12,26L-10,29L-9,32L15,32L17,26L19,27L19,34L25,38L28,38L29,34L32,34L31,41L38,44L42,38L43,35L45,34L41,43L42,48L47,51L49,51L55,24L54,18L52,17L46,17L42,19L37,26L36,24L37,16L32,14L24,14L23,15L18,15L11,8L8,9L4,20L3,23L1,15L-2,8L-5,8ZM3,14L4,16L3,14ZM-62,28L-66,34L-66,42L-56,55L-52,59L-46,55L-47,50L-56,31L-60,28L-62,28ZM67,28L63,30L56,46L52,52L54,56L59,59L65,52L72,43L73,36L70,29L67,28ZM-5,35L-7,36L-5,45L-2,57L-6,49L-10,39L-12,38L-20,43L-12,67L-1,94L-1,95L-10,75L-22,45L-27,46L-29,47L-28,54L-18,79L-26,64L-31,52L-34,51L-40,55L-39,64L-42,58L-46,59L-45,64L-39,75L-30,91L-22,107L-19,110L-22,101L-31,80L-31,78L-21,97L-13,113L-4,127L1,131L6,131L11,127L20,112L28,96L36,81L38,78L32,93L25,108L26,111L32,101L40,84L52,63L53,60L49,58L46,63L47,56L41,51L38,51L29,71L25,78L36,51L35,47L32,45L28,46L17,74L7,96L13,80L21,60L26,46L25,41L19,38L17,38L9,57L11,47L13,40L12,35L-5,35ZM-50,62L-49,67L-43,75L-42,73L-47,62L-50,62ZM53,62L49,72L50,75L56,66L57,62L53,62ZM-48,83L-49,111L-49,124L-47,124L-46,126L-43,114L-42,115L-46,132L-58,165L-68,190L-72,198L-77,206L-89,236L-96,257L-102,285L-103,293L-103,338L-102,356L-100,363L-100,372L-104,373L-107,380L-107,396L-104,404L-99,409L-97,409L-97,392L-93,419L-93,424L-103,429L-104,430L-104,442L-102,457L-97,470L-90,479L-78,490L-72,494L-70,496L-67,506L-57,515L-41,527L-26,537L-3,549L0,551L6,551L31,538L49,526L62,516L74,505L77,495L86,488L96,479L103,471L108,459L111,439L111,430L103,425L99,425L104,390L103,409L108,407L113,399L114,394L114,383L111,373L107,372L106,370L106,364L108,359L109,352L110,324L110,297L108,282L102,255L94,232L82,203L78,197L74,189L64,164L52,130L49,119L49,114L52,125L55,124L56,118L55,104L55,84L52,85L44,96L35,107L27,117L20,124L14,128L7,134L-1,134L-6,129L-11,125L-19,119L-30,105L-41,92L-47,83L-48,83ZM62,113L62,121L65,140L67,140L67,126L63,113L62,113ZM-57,114L-60,124L-61,137L-59,141L-56,125L-55,114L-57,114ZM270,298L270,330L273,333L276,333L276,298L270,298ZM258,309L257,314L257,324L263,327L265,327L265,309L258,309ZM216,319L200,322L182,329L168,336L154,346L142,357L135,367L133,372L133,381L138,393L142,398L146,401L150,402L288,402L294,399L301,391L305,378L304,370L299,361L286,348L274,339L260,331L246,325L234,321L222,319L216,319ZM170,325L160,329L150,338L146,344L147,346L155,339L171,329L176,325L170,325ZM163,407L162,425L240,425L240,407L236,407L236,420L234,420L234,408L233,407L189,407L170,408L169,409L168,418L166,408L163,407ZM177,432L175,445L174,451L186,455L193,458L217,460L219,463L221,463L224,456L226,443L226,432L177,432ZM172,454L170,458L184,458L183,456L176,454L172,454ZM-206,462L-209,466L-209,468L-114,468L-108,469L-105,467L-106,463L-107,462L-206,462ZM113,462L112,467L115,469L120,468L216,468L214,463L213,462L113,462ZM-105,470L-104,477L-101,487L-104,484L-109,472L-215,472L-221,480L-226,497L-226,503L-216,507L-212,510L-189,511L-109,511L-105,503L-94,493L-88,489L-89,486L-97,479L-103,470L-105,470ZM110,470L100,483L95,487L96,490L107,499L114,507L116,511L196,511L218,510L230,504L233,503L232,494L227,479L221,472L115,472L110,485L108,486L111,476L112,471L110,470ZM-79,496L-90,507L-90,512L-84,520L-81,522L-76,517L-70,514L-72,510L-75,503L-75,497L-79,496ZM83,496L82,497L80,507L76,514L85,519L88,522L96,513L97,508L93,503L87,498L86,496L83,496ZM-266,508L-282,509L-294,512L-298,516L-298,522L-294,526L-280,530L-271,531L-240,531L-226,528L-220,524L-219,522L-219,516L-224,511L-238,508L-266,508ZM244,508L231,511L226,515L225,520L228,525L236,529L247,531L277,531L291,529L301,526L305,521L304,515L298,511L289,509L272,508L244,508ZM-208,518L-218,528L-230,533L-242,536L-268,536L-284,534L-301,528L-311,530L-323,534L-323,538L-312,553L-304,563L-295,573L-279,589L-271,596L-264,602L-247,611L-236,618L-218,628L-214,627L-206,619L-205,615L-201,613L-194,608L-185,609L-172,619L-168,623L-164,621L-157,612L-151,602L-143,588L-127,558L-119,541L-120,546L-132,571L-142,589L-149,603L-157,616L-164,625L-165,628L-170,626L-173,623L-175,623L-176,620L-189,611L-194,612L-198,615L-198,617L-191,617L-185,621L-174,640L-165,640L-160,637L-153,627L-141,605L-130,582L-121,563L-112,543L-113,539L-138,529L-150,525L-174,520L-200,518L-208,518ZM207,518L181,520L156,525L136,532L119,539L118,542L135,579L140,589L150,610L159,626L166,636L169,639L172,640L180,640L186,631L192,621L197,617L205,617L201,612L196,611L187,617L175,627L171,626L161,612L149,591L128,550L124,540L126,540L128,546L143,576L153,595L165,614L172,623L176,622L183,615L194,608L201,608L211,616L218,624L222,628L228,626L242,618L251,613L265,605L273,600L280,593L291,584L299,576L306,568L315,558L329,539L330,535L321,531L311,528L305,529L290,534L274,536L249,536L233,532L222,526L214,518L207,518ZM-60,521L-60,526L-57,528L-50,529L-55,524L-60,521ZM65,521L57,528L59,529L66,527L67,526L67,521L65,521ZM-61,532L-62,537L-43,547L-22,556L-19,557L-16,566L-5,573L1,576L8,575L23,566L26,557L43,550L66,539L69,535L68,532L60,533L55,535L46,537L26,546L16,559L13,562L13,564L9,566L6,568L0,568L-8,561L-20,546L-37,538L-58,532L-61,532ZM-93,518L-92,525L-86,534L-84,534L-84,536L-71,546L-57,555L-46,561L-37,566L-36,568L-46,564L-66,553L-81,542L-90,534L-91,534L-91,543L-88,561L-80,565L-67,570L-31,588L-27,587L-33,578L-34,571L-32,573L-30,578L-22,588L-17,592L-15,592L-17,587L-21,578L-23,562L-26,561L-28,562L-30,558L-46,551L-68,539L-79,532L-86,525L-87,523L-89,523L-91,519L-93,518ZM98,518L89,529L78,537L54,550L38,557L35,559L34,562L30,561L29,563L28,576L24,586L21,592L25,591L31,586L35,580L40,571L39,580L35,585L34,588L40,587L80,567L93,562L95,560L98,538L98,534L95,535L90,540L77,550L64,558L48,566L43,567L51,562L69,552L84,541L94,532L99,524L100,518L98,518ZM-12,550L-10,554L-7,558L-5,558L-3,562L1,565L7,564L15,556L19,550L14,551L7,554L-1,554L-9,550L-12,550ZM-110,556L-118,572L-120,579L-112,581L-92,585L-78,589L-61,594L-45,599L-34,603L-24,607L-15,613L-10,621L-8,631L-6,668L-6,704L-7,724L-9,733L-23,741L-36,744L-60,746L-76,751L-102,761L-110,761L-118,755L-127,743L-139,722L-147,707L-152,695L-156,687L-157,690L-151,710L-139,743L-125,773L-122,781L-115,781L-100,775L-94,770L-89,770L-86,773L-84,781L-85,790L-89,800L-96,810L-109,819L-116,822L-115,832L-114,835L-109,834L-97,829L-61,817L-46,811L-37,804L-37,806L-28,803L-23,799L-17,783L-11,775L-2,770L8,770L17,775L19,775L27,791L31,801L41,806L48,807L54,812L74,819L110,831L117,835L120,835L122,829L122,822L111,816L102,809L95,800L91,789L91,777L94,771L101,770L107,775L121,781L128,781L132,772L146,742L157,712L163,692L163,687L161,690L155,703L147,719L135,741L127,752L119,760L116,761L108,761L77,749L66,746L36,743L26,739L15,732L14,729L13,716L13,656L15,627L18,618L24,611L34,605L70,593L95,586L111,582L127,579L120,562L116,556L108,562L92,571L79,576L50,591L22,603L9,607L-3,607L-23,600L-43,591L-67,579L-80,573L-90,569L-107,558L-110,556ZM-15,572L-13,581L-7,589L-5,589L-5,591L2,595L7,594L17,585L21,577L22,572L18,574L7,580L-1,580L-11,574L-15,572ZM-123,588L-127,592L-141,620L-147,630L-151,637L-158,645L-158,652L-154,669L-148,685L-142,698L-127,728L-120,739L-113,748L-108,753L-100,752L-71,741L-55,738L-30,736L-19,732L-14,729L-12,724L-11,699L-13,650L-15,626L-18,620L-27,613L-38,609L-54,604L-76,597L-91,593L-113,588L-123,588ZM120,588L101,592L88,596L72,600L56,605L36,612L28,617L23,622L21,629L19,660L18,682L18,716L20,728L28,733L37,736L62,738L81,742L109,753L115,753L122,746L132,730L146,704L154,686L162,665L165,649L164,645L156,635L143,611L135,594L130,588L120,588ZM-251,620L-252,627L-252,659L-250,664L-246,666L-233,660L-221,653L-207,646L-195,638L-187,632L-189,627L-191,625L-198,626L-209,633L-215,637L-225,633L-241,624L-248,620L-251,620ZM256,619L229,634L221,637L210,629L202,625L197,626L194,629L195,633L207,642L231,655L245,663L252,666L256,665L258,661L259,647L259,631L258,621L256,619ZM-185,638L-197,648L-214,658L-230,667L-239,672L-241,678L-242,683L-243,708L-236,750L-236,756L-240,735L-245,712L-247,711L-249,721L-255,758L-260,785L-259,791L-251,796L-239,802L-232,804L-224,804L-219,783L-215,771L-216,755L-216,728L-213,699L-209,679L-204,667L-197,656L-184,640L-185,638ZM190,638L192,642L203,655L210,666L214,674L219,696L222,720L222,772L227,788L231,804L233,805L245,802L261,794L266,790L266,782L257,732L254,713L252,711L245,742L242,759L243,746L249,714L249,689L246,672L229,663L205,649L195,641L192,638L190,638ZM-181,646L-185,651L-195,665L-200,675L-204,690L-207,709L-208,719L-208,762L-203,780L-196,790L-194,791L-188,791L-180,786L-175,781L-171,776L-163,761L-159,746L-156,727L-156,720L-160,705L-164,689L-167,668L-167,648L-169,647L-179,647L-181,646ZM267,646L266,660L263,669L263,676L262,673L254,674L253,679L260,713L264,735L266,735L272,714L274,703L275,690L275,671L272,655L268,646L267,646ZM-262,647L-266,657L-269,674L-269,685L-267,708L-260,734L-258,736L-254,715L-247,681L-246,675L-252,673L-256,674L-259,662L-260,648L-262,647ZM187,646L185,647L173,648L174,664L170,692L163,718L163,729L167,753L171,764L180,780L190,789L194,791L201,791L208,783L212,772L214,765L215,755L215,724L212,698L208,679L203,667L196,657L188,646L187,646ZM220,773L214,788L206,797L197,799L188,797L187,798L187,803L190,805L203,807L218,807L226,806L228,803L225,788L224,779L221,773L220,773ZM-215,774L-218,784L-221,800L-221,805L-220,806L-211,807L-197,807L-184,805L-181,803L-181,797L-192,799L-201,796L-208,787L-213,774L-215,774ZM-133,775L-135,778L-134,792L-129,808L-124,814L-117,814L-106,808L-100,803L-95,796L-91,785L-92,776L-97,778L-103,782L-114,787L-124,788L-121,794L-125,792L-130,784L-131,776L-133,775ZM-1,776L-9,782L-15,792L-18,800L-18,804L-7,803L-2,806L0,810L2,823L4,825L7,808L10,804L17,803L25,804L22,794L16,782L7,776L-1,776ZM139,775L137,778L135,786L131,793L128,793L130,788L121,787L105,779L101,776L98,777L98,786L102,797L110,806L121,813L129,815L134,810L137,805L141,790L141,776L139,775ZM-274,791L-274,796L-266,802L-256,809L-240,817L-228,820L-205,820L-187,817L-184,814L-193,814L-202,815L-211,815L-228,813L-244,809L-262,799L-272,791L-274,791ZM279,791L267,800L253,808L240,812L218,815L209,815L191,814L193,817L211,820L237,820L251,815L264,808L274,801L281,796L280,791L279,791ZM-284,798L-288,805L-290,812L-291,830L-292,815L-294,815L-299,832L-302,848L-303,858L-303,877L-301,893L-298,901L-296,901L-295,898L-294,914L-291,918L-290,917L-290,872L-287,833L-283,802L-284,798ZM290,799L291,815L295,847L296,860L297,917L299,917L301,912L302,896L303,902L305,901L309,885L309,853L306,835L301,816L299,814L298,822L297,821L295,806L292,800L290,799ZM-275,800L-277,806L-282,847L-283,860L-284,957L-287,974L-291,987L-303,1015L-311,1028L-312,1032L-284,1032L-251,1037L-239,1037L-229,1041L-227,1044L-224,1044L-219,1035L-220,1027L-225,1005L-226,999L-226,986L-221,964L-213,940L-215,938L-231,943L-240,943L-243,941L-245,930L-245,888L-242,872L-238,866L-227,854L-219,847L-207,836L-196,827L-191,823L-191,821L-206,823L-223,823L-234,822L-246,817L-259,810L-271,802L-275,800ZM280,800L269,808L257,815L249,819L241,822L229,823L213,823L198,821L200,825L213,836L225,847L233,854L244,865L249,873L251,885L252,901L251,933L249,942L247,943L238,943L222,938L220,938L221,945L229,970L233,989L232,1003L226,1028L226,1036L231,1044L234,1044L237,1040L247,1037L257,1037L289,1032L319,1032L317,1027L309,1014L298,988L294,977L291,961L290,951L290,869L287,833L283,802L282,800L280,800ZM-13,810L-30,814L-49,821L-64,827L-70,831L-69,838L-58,861L-54,867L-47,866L-32,861L-2,852L0,848L-5,814L-6,810L-13,810ZM13,810L12,811L7,844L7,851L16,854L42,862L56,867L62,866L74,842L77,835L76,830L63,824L39,815L20,810L13,810ZM180,818L180,826L191,840L200,857L208,879L213,898L205,902L192,902L194,907L201,915L210,923L220,929L236,935L239,935L239,920L237,889L235,878L229,869L227,865L234,874L237,883L240,907L243,936L245,936L246,932L246,910L245,888L242,875L235,867L223,855L218,851L216,852L218,855L201,838L194,830L189,826L183,819L180,818ZM-175,818L-204,847L-208,850L-212,852L-226,864L-231,869L-235,874L-237,879L-239,891L-239,936L-236,935L-232,891L-229,878L-226,872L-219,863L-216,861L-225,872L-229,879L-231,894L-233,934L-229,935L-211,928L-200,920L-191,912L-186,905L-186,902L-198,902L-205,898L-204,889L-197,866L-189,848L-183,838L-177,830L-174,827L-173,819L-175,818ZM-80,830L-103,838L-104,840L-103,844L-104,846L-104,853L-97,867L-87,880L-85,885L-84,891L-81,941L-80,955L-71,959L-63,961L-65,955L-67,951L-67,944L-59,928L-57,922L-64,914L-71,898L-71,887L-65,878L-59,873L-61,868L-68,853L-74,837L-76,837L-76,830L-80,830ZM83,830L81,837L76,849L69,865L66,871L68,875L73,880L77,886L78,896L73,909L67,919L64,922L65,927L73,943L74,949L71,957L70,961L86,956L87,955L90,898L91,887L95,878L104,866L111,852L110,839L101,835L86,830L83,830ZM-176,835L-180,840L-189,857L-197,878L-200,888L-200,893L-198,895L-189,895L-183,891L-176,881L-171,868L-168,857L-168,840L-170,836L-176,835ZM179,835L175,838L174,855L179,873L185,885L190,892L196,895L204,895L207,892L206,887L199,866L191,848L184,836L179,835ZM-311,849L-313,858L-313,869L-312,875L-310,875L-310,849L-311,849ZM316,849L317,875L319,872L319,855L317,849L316,849ZM-107,860L-120,912L-121,920L-121,932L-120,937L-106,945L-84,954L-83,953L-84,911L-86,886L-90,880L-95,875L-101,867L-105,860L-107,860ZM111,860L105,871L96,881L93,885L92,889L91,905L90,938L90,954L105,948L121,940L127,936L127,916L120,885L114,861L111,860ZM9,861L7,876L7,890L10,903L13,906L34,911L43,914L49,915L59,915L63,911L70,897L70,889L66,883L58,874L38,868L13,861L9,861ZM-6,861L-31,868L-52,874L-61,885L-64,890L-63,898L-56,912L-53,915L-43,915L-30,912L-15,908L-5,905L-2,898L-1,893L-1,872L-2,862L-6,861ZM-12,915L-27,919L-39,922L-51,924L-56,935L-61,948L-57,956L-52,961L-47,967L-27,975L-16,986L-4,993L-2,993L-2,982L-4,952L-6,915L-12,915ZM12,915L10,966L8,993L13,992L24,985L35,974L52,968L63,956L67,950L66,943L59,928L58,924L37,920L19,915L12,915ZM-132,932L-137,936L-138,938L-139,974L-133,981L-114,993L-96,1005L-80,1014L-68,1023L-64,1023L-62,1029L-56,1049L-45,1083L-41,1094L-38,1100L-37,1097L-39,1088L-30,1113L-23,1124L-15,1133L-5,1138L5,1140L16,1136L25,1130L33,1119L39,1107L46,1087L51,1062L56,1041L55,1051L49,1079L46,1089L45,1097L47,1096L52,1082L60,1057L65,1042L68,1030L71,1024L76,1022L91,1011L109,1001L122,992L138,982L143,978L146,973L144,937L139,932L136,932L133,937L126,944L115,951L90,962L70,969L49,977L39,981L34,986L27,992L16,999L8,1002L-2,1002L-18,994L-30,983L-36,979L-53,973L-73,966L-88,960L-106,952L-117,946L-122,941L-124,941L-126,937L-130,932L-132,932ZM-138,987L-142,992L-140,997L-133,1007L-126,1015L-117,1022L-104,1033L-98,1037L-96,1037L-93,1021L-93,1015L-110,1005L-125,995L-136,988L-138,987ZM144,987L121,1002L105,1012L100,1015L100,1023L102,1036L106,1036L126,1020L138,1009L147,997L148,992L145,987L144,987ZM-149,994L-150,996L-152,1016L-157,1031L-172,1063L-176,1071L-183,1089L-190,1113L-196,1138L-199,1151L-201,1163L-201,1182L-192,1184L-187,1192L-183,1205L-181,1218L-181,1241L-182,1253L-186,1262L-193,1265L-192,1281L-188,1295L-184,1293L-175,1283L-166,1272L-159,1265L-152,1257L-143,1247L-131,1234L-122,1222L-116,1209L-108,1179L-101,1149L-92,1110L-85,1086L-79,1068L-78,1060L-82,1056L-97,1048L-113,1036L-124,1026L-134,1018L-143,1005L-148,994L-149,994ZM154,994L149,1006L141,1017L128,1029L117,1038L102,1049L87,1057L85,1059L85,1066L91,1084L97,1105L106,1142L115,1182L123,1210L131,1226L141,1237L148,1245L161,1259L168,1267L177,1277L185,1287L187,1287L189,1291L194,1295L197,1287L199,1277L200,1265L193,1262L190,1258L188,1250L187,1226L189,1207L193,1194L197,1186L200,1183L208,1182L207,1159L203,1139L194,1103L185,1077L179,1063L171,1047L162,1028L158,1012L156,995L154,994ZM-90,1018L-92,1040L-89,1043L-74,1051L-71,1057L-72,1065L-78,1084L-83,1104L-90,1134L-101,1183L-108,1209L-113,1222L-120,1233L-125,1240L-122,1249L-122,1254L-124,1245L-126,1242L-129,1243L-136,1251L-150,1266L-157,1274L-159,1278L-149,1272L-140,1271L-134,1275L-129,1281L-127,1281L-122,1270L-121,1266L-122,1274L-125,1282L-124,1287L-114,1304L-107,1318L-105,1316L-100,1300L-94,1290L-95,1284L-101,1270L-103,1263L-102,1247L-99,1232L-92,1204L-85,1179L-79,1162L-69,1132L-62,1119L-61,1118L-55,1118L-48,1130L-46,1128L-43,1121L-42,1124L-44,1140L-37,1154L-34,1153L-31,1143L-28,1138L-28,1136L-26,1136L-27,1131L-34,1122L-41,1111L-48,1096L-60,1060L-66,1040L-72,1028L-87,1018L-90,1018ZM93,1018L83,1025L78,1029L72,1041L63,1070L54,1097L45,1116L34,1131L32,1135L36,1140L40,1151L41,1154L43,1154L50,1141L50,1133L48,1120L50,1120L53,1129L56,1129L60,1120L60,1118L68,1118L76,1134L82,1151L95,1191L103,1221L107,1237L109,1251L109,1265L103,1281L101,1285L101,1291L105,1298L109,1306L112,1317L115,1317L122,1301L131,1287L131,1280L128,1272L128,1268L132,1278L135,1281L141,1275L141,1273L146,1271L155,1272L162,1276L165,1276L154,1264L147,1256L135,1243L132,1242L130,1247L128,1256L129,1247L131,1238L123,1228L116,1214L109,1189L96,1132L90,1106L84,1082L78,1064L78,1055L82,1050L97,1042L98,1041L98,1030L97,1018L93,1018ZM-163,1019L-169,1027L-173,1036L-173,1044L-170,1041L-162,1024L-162,1019L-163,1019ZM168,1019L169,1025L178,1044L180,1040L178,1032L172,1022L168,1019ZM-298,1035L-318,1038L-318,1040L-292,1039L-284,1037L-284,1036L-298,1035ZM300,1035L289,1036L293,1038L299,1039L325,1040L324,1038L304,1035L300,1035ZM-277,1046L-280,1050L-292,1082L-297,1097L-299,1105L-300,1123L-297,1131L-289,1139L-279,1152L-267,1168L-262,1166L-252,1159L-239,1148L-233,1140L-232,1138L-232,1131L-233,1128L-238,1129L-240,1130L-246,1130L-253,1122L-255,1119L-257,1119L-259,1114L-262,1107L-263,1088L-261,1088L-259,1103L-256,1102L-252,1094L-250,1083L-248,1083L-249,1086L-249,1093L-240,1099L-232,1102L-225,1101L-223,1099L-223,1086L-226,1071L-229,1064L-230,1051L-230,1049L-241,1047L-252,1046L-277,1046ZM258,1046L240,1048L237,1049L236,1062L232,1073L229,1089L229,1098L231,1101L239,1102L251,1096L256,1092L256,1084L260,1098L263,1103L266,1102L268,1088L269,1089L269,1104L266,1113L262,1119L254,1129L247,1130L240,1127L239,1128L239,1139L243,1145L252,1154L265,1164L272,1168L274,1168L284,1154L295,1140L304,1130L306,1125L306,1109L303,1095L293,1066L287,1052L285,1047L283,1046L258,1046ZM288,1046L289,1051L295,1067L303,1090L307,1106L308,1115L310,1115L314,1101L316,1073L317,1060L319,1049L317,1048L294,1046L288,1046ZM-288,1046L-311,1048L-312,1049L-311,1058L-309,1078L-308,1098L-304,1114L-302,1115L-301,1113L-299,1097L-291,1074L-286,1061L-282,1050L-282,1046L-288,1046ZM-251,1097L-254,1105L-255,1113L-250,1117L-246,1122L-240,1121L-240,1119L-236,1117L-229,1109L-229,1107L-240,1103L-248,1098L-251,1097ZM44,1097L45,1099L44,1097ZM256,1097L247,1103L240,1106L235,1107L238,1112L248,1122L253,1121L262,1112L260,1103L258,1097L256,1097ZM-59,1126L-63,1132L-69,1150L-77,1177L-83,1198L-90,1225L-94,1241L-96,1255L-96,1263L-90,1279L-82,1299L-75,1319L-73,1328L-70,1329L-64,1310L-60,1297L-44,1249L-32,1208L-29,1198L-29,1186L-34,1175L-51,1142L-57,1127L-59,1126ZM64,1126L54,1149L37,1182L35,1189L36,1200L44,1226L56,1267L62,1283L70,1307L75,1324L77,1329L79,1329L83,1314L97,1277L102,1265L102,1252L99,1235L91,1203L84,1178L76,1152L69,1131L66,1126L64,1126ZM-21,1140L-25,1148L-28,1164L-28,1170L-23,1181L-22,1185L-22,1200L-26,1213L-40,1261L-49,1285L-68,1342L-67,1359L-61,1386L-56,1391L-49,1405L-44,1422L-42,1435L-42,1473L-46,1492L-54,1508L-63,1523L-74,1541L-77,1550L-81,1571L-84,1597L-86,1611L-86,1616L-85,1617L-35,1617L-34,1513L-31,1517L-30,1555L-10,1554L-10,1364L-11,1168L-12,1144L-17,1140L-21,1140ZM-3,1148L-4,1149L-5,1359L-5,1460L-2,1461L-1,1390L1,1307L3,1163L3,1148L-3,1148ZM-201,1187L-206,1192L-210,1199L-213,1211L-213,1234L-208,1250L-204,1255L-201,1257L-192,1257L-189,1253L-188,1250L-188,1204L-191,1191L-195,1187L-201,1187ZM201,1187L197,1192L195,1201L194,1216L194,1247L197,1256L199,1257L208,1257L215,1249L220,1233L220,1218L218,1205L214,1194L210,1188L208,1187L201,1187ZM-145,1278L-151,1282L-161,1293L-171,1307L-180,1322L-187,1342L-188,1348L-188,1368L-183,1381L-172,1402L-164,1413L-156,1423L-147,1432L-143,1431L-136,1424L-132,1419L-126,1414L-117,1403L-111,1395L-109,1389L-108,1382L-108,1374L-111,1360L-119,1336L-128,1316L-137,1300L-144,1290L-146,1287L-141,1290L-135,1299L-129,1309L-118,1332L-110,1354L-107,1367L-107,1387L-112,1399L-124,1413L-131,1421L-139,1430L-143,1434L-138,1434L-127,1426L-116,1414L-110,1406L-100,1391L-98,1386L-98,1369L-101,1355L-107,1337L-119,1309L-127,1295L-134,1286L-141,1278L-145,1278ZM148,1278L143,1283L137,1290L130,1301L122,1317L111,1344L105,1365L105,1387L110,1397L119,1409L127,1419L138,1430L145,1434L150,1434L141,1425L136,1419L131,1414L120,1401L116,1394L113,1385L113,1370L116,1356L124,1333L132,1316L145,1293L149,1288L152,1288L144,1299L137,1311L129,1328L120,1352L115,1370L115,1386L118,1396L131,1412L148,1429L150,1432L155,1431L163,1423L172,1411L180,1400L193,1373L195,1366L195,1352L193,1340L185,1319L175,1303L164,1289L157,1281L151,1278L148,1278ZM-170,1289L-169,1291L-170,1289ZM-94,1293L-100,1308L-104,1327L-97,1345L-92,1364L-92,1388L-94,1394L-94,1403L-89,1416L-85,1414L-76,1404L-69,1393L-68,1386L-74,1359L-76,1337L-82,1316L-91,1294L-94,1293ZM98,1293L92,1308L87,1321L83,1335L80,1362L74,1387L75,1392L81,1402L93,1415L96,1416L101,1401L101,1395L98,1386L98,1368L103,1347L109,1331L110,1329L109,1319L105,1304L100,1293L98,1293ZM-193,1382L-200,1397L-206,1416L-207,1420L-207,1429L-203,1438L-196,1451L-194,1476L-190,1474L-188,1471L-189,1457L-191,1443L-199,1427L-200,1422L-193,1391L-191,1388L-191,1382L-193,1382ZM198,1382L198,1389L201,1397L206,1419L206,1426L197,1445L195,1462L195,1472L200,1477L202,1453L210,1437L214,1428L213,1418L208,1400L201,1385L200,1382L198,1382ZM-186,1397L-187,1403L-187,1412L-181,1464L-180,1465L-168,1466L-155,1471L-146,1478L-142,1477L-135,1469L-130,1463L-128,1448L-123,1443L-113,1436L-101,1428L-90,1418L-98,1402L-102,1406L-109,1415L-120,1427L-128,1434L-139,1439L-148,1439L-155,1435L-164,1426L-171,1417L-181,1402L-184,1397L-186,1397ZM191,1397L184,1407L178,1416L168,1429L159,1437L155,1439L145,1439L132,1432L122,1423L113,1412L105,1402L103,1404L98,1416L98,1420L109,1429L132,1445L134,1445L136,1455L137,1465L144,1471L150,1478L154,1477L162,1471L175,1466L187,1465L188,1461L190,1442L193,1418L193,1398L191,1397ZM-60,1401L-66,1413L-74,1423L-87,1435L-97,1442L-109,1450L-114,1452L-115,1454L-115,1477L-113,1490L-108,1516L-102,1532L-95,1546L-93,1549L-89,1547L-76,1530L-61,1505L-53,1489L-49,1471L-49,1437L-52,1421L-57,1405L-59,1401L-60,1401ZM65,1402L61,1412L57,1426L55,1440L55,1457L56,1474L61,1493L68,1506L82,1529L90,1540L98,1549L103,1544L110,1529L115,1514L120,1489L122,1470L122,1460L121,1453L102,1441L100,1441L100,1439L92,1433L82,1425L74,1415L67,1402L65,1402ZM73,1405L74,1407L73,1405ZM-68,1406L-82,1421L-93,1431L-103,1438L-116,1446L-122,1449L-123,1451L-123,1484L-119,1505L-112,1524L-104,1541L-96,1552L-93,1551L-93,1549L-96,1549L-98,1544L-106,1527L-111,1512L-115,1491L-117,1479L-118,1455L-120,1452L-115,1451L-104,1443L-95,1437L-86,1430L-74,1419L-67,1408L-68,1406ZM74,1407L76,1413L86,1425L104,1439L119,1449L126,1453L124,1457L124,1474L122,1489L117,1513L112,1529L104,1545L102,1548L99,1550L100,1552L103,1552L112,1538L122,1516L128,1493L129,1487L129,1449L119,1444L105,1435L95,1427L83,1416L75,1407L74,1407ZM-210,1437L-212,1448L-212,1462L-209,1476L-203,1493L-196,1510L-195,1510L-196,1492L-195,1484L-196,1483L-198,1467L-199,1453L-209,1437L-210,1437ZM215,1437L208,1449L206,1451L203,1482L202,1489L202,1503L201,1511L204,1507L214,1481L218,1465L218,1444L216,1437L215,1437ZM-179,1475L-188,1480L-190,1490L-188,1504L-181,1524L-170,1551L-166,1560L-164,1561L-155,1532L-150,1518L-146,1501L-146,1495L-152,1486L-163,1478L-173,1475L-179,1475ZM-160,1475L-155,1480L-149,1485L-144,1494L-144,1501L-151,1527L-158,1546L-162,1562L-162,1569L-160,1571L-157,1563L-141,1508L-140,1496L-143,1488L-151,1479L-158,1475L-160,1475ZM-132,1475L-139,1483L-137,1488L-134,1497L-134,1509L-139,1530L-148,1560L-153,1579L-156,1588L-161,1588L-166,1580L-176,1558L-178,1553L-180,1553L-180,1566L-179,1584L-171,1596L-170,1609L-171,1613L-173,1614L-173,1620L-176,1622L-176,1632L-170,1642L-169,1646L-169,1655L-174,1665L-180,1672L-185,1672L-190,1664L-194,1655L-196,1655L-205,1685L-209,1695L-209,1701L-206,1704L-202,1702L-193,1693L-183,1686L-177,1683L-161,1683L-146,1687L-129,1694L-114,1702L-103,1708L-87,1719L-85,1722L-81,1720L-73,1712L-70,1708L-71,1701L-84,1674L-93,1650L-95,1642L-95,1623L-89,1574L-86,1560L-86,1557L-90,1559L-93,1561L-98,1561L-101,1560L-103,1556L-113,1540L-122,1519L-127,1502L-130,1484L-131,1475L-132,1475ZM179,1475L169,1478L159,1486L153,1494L153,1503L158,1523L163,1536L170,1560L173,1560L182,1538L194,1506L196,1495L196,1484L193,1479L185,1475L179,1475ZM137,1476L135,1494L131,1512L125,1528L117,1544L108,1558L104,1561L99,1561L93,1557L94,1566L96,1578L98,1595L101,1617L102,1629L102,1639L98,1655L86,1684L76,1704L77,1708L86,1719L89,1722L92,1721L96,1717L111,1707L128,1698L144,1690L166,1683L183,1683L191,1687L203,1696L210,1704L215,1702L216,1696L209,1677L203,1656L200,1656L193,1670L191,1672L186,1672L178,1661L175,1653L176,1644L180,1636L182,1634L183,1622L179,1619L180,1614L177,1612L177,1599L180,1592L186,1583L186,1553L184,1554L177,1570L169,1587L168,1588L163,1588L161,1586L155,1561L147,1535L141,1512L140,1501L143,1489L146,1483L139,1476L137,1476ZM163,1476L155,1481L149,1489L147,1494L147,1505L153,1528L163,1561L166,1571L169,1568L168,1560L163,1542L156,1522L151,1504L151,1492L158,1482L165,1477L163,1476ZM-195,1510L-194,1512L-195,1510ZM-197,1567L-197,1584L-193,1597L-184,1608L-177,1614L-174,1613L-175,1612L-177,1599L-186,1586L-192,1576L-195,1567L-197,1567ZM202,1567L196,1581L188,1593L184,1598L181,1614L185,1613L191,1608L200,1596L203,1587L204,1581L204,1567L202,1567ZM-194,1622L-195,1625L-195,1633L-192,1643L-184,1662L-180,1662L-176,1656L-175,1653L-175,1645L-184,1636L-190,1627L-193,1622L-194,1622ZM199,1623L192,1634L188,1639L183,1643L181,1647L182,1655L187,1663L190,1662L194,1654L200,1639L201,1636L201,1623L199,1623ZM-170,1685L-178,1687L-189,1695L-189,1697L-177,1693L-161,1693L-140,1699L-130,1703L-108,1715L-91,1725L-86,1726L-85,1722L-103,1709L-114,1703L-130,1695L-144,1690L-156,1686L-170,1685ZM171,1685L159,1687L141,1693L126,1700L109,1709L96,1719L92,1722L93,1726L98,1725L111,1717L141,1701L156,1696L167,1693L183,1693L193,1697L196,1696L186,1688L182,1686L171,1685ZM-177,1705L-193,1713L-199,1729L-198,1733L-203,1739L-191,1742L-177,1749L-158,1763L-147,1772L-140,1779L-133,1787L-131,1790L-128,1790L-129,1784L-137,1773L-144,1765L-152,1758L-163,1749L-168,1744L-179,1736L-171,1740L-162,1747L-149,1759L-138,1770L-136,1770L-134,1775L-126,1784L-122,1782L-113,1772L-102,1762L-95,1756L-91,1749L-90,1745L-90,1734L-94,1730L-115,1718L-126,1713L-143,1708L-150,1706L-177,1705ZM178,1705L156,1706L133,1713L110,1724L99,1731L97,1733L97,1747L102,1757L115,1768L123,1775L130,1784L134,1783L146,1768L151,1763L157,1758L157,1756L159,1756L159,1754L163,1752L173,1743L180,1738L184,1737L171,1747L161,1756L156,1761L144,1772L134,1786L135,1791L149,1777L149,1775L151,1775L156,1770L167,1761L184,1749L193,1744L203,1740L210,1739L205,1734L204,1732L205,1728L200,1714L191,1708L183,1705L178,1705ZM-200,1756L-215,1761L-229,1768L-239,1777L-251,1786L-267,1796L-281,1805L-287,1809L-288,1815L-287,1816L-259,1816L-145,1815L-138,1807L-135,1802L-136,1796L-149,1782L-163,1771L-174,1764L-188,1757L-191,1756L-200,1756ZM197,1756L178,1765L164,1775L153,1785L148,1790L141,1798L142,1803L149,1812L152,1815L265,1816L294,1816L294,1810L290,1806L279,1800L249,1780L236,1768L224,1762L207,1756L197,1756Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,485,94)">
                        <path d="M0,0L3,4L10,22L9,24L2,10L0,4L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,555,94)">
                        <path d="M0,0L1,3L-5,18L-8,24L-9,21L-1,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,510,126)">
                        <path d="M0,0L2,1L9,17L9,20L11,19L18,2L20,1L19,8L13,24L12,29L8,28L4,15L0,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,729,368)">
                        <path d="M0,0L14,0L30,3L46,9L61,17L72,25L81,34L84,42L84,54L81,61L78,64L72,66L65,65L4,64L-52,65L-58,66L-65,63L-69,58L-71,51L-70,40L-66,32L-56,23L-41,13L-25,6L-12,2L0,0ZM-14,16L-23,18L-14,16ZM64,32L50,24L40.934,19.452C40.934,19.452 31.837,15.614 27,15C19.844,14.091 4.778,13.839 -2,14C-5.943,14.094 -13.669,15.967 -13.669,15.967L-14,16L-23,18L-36,24L-50,32L-60,41L-63,44L-64,47L-64,55L-59,59L-7,60L21,60L73,59M73,59L77,56L78,48L64,32L50,24L64,32" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,427,383)">
                        <path d="M0,0L5,1L21,10L37,20L56,32L79,45L91,51L98,50L122,37L140,26L161,13L179,2L183,0L187,0L189,6L188,19L182,60L180,74L175,79L163,89L155,95L152,116L145,150L142,156L131,165L121,173L112,180L107,181L99,174L96,171L96,169L91,170L81,180L77,181L70,177L61,169L52,162L44,155L41,147L34,113L31,94L20,86L14,81L6,74L6,66L2,44L-2,16L-2,5L0,0ZM5,8L4,10L8,37L12,70L14,74L22,79L32,86L37,90L39,100L41,118L46,145L49,152L66,165L76,173L80,172L88,164L91,162L97,163L107,173L112,172L124,162L137,152L140,147L145,121L148,95L150,88L155,86L168,76L173,73L174,72L178,42L182,13L182,9L178,10L174,13L172,23L167,35L160,47L153,56L149,61L138,69L135,70L125,70L113,64L103,57L99,58L95,61L96,76L96,118L91,118L91,60L86,57L82,58L72,65L64,69L61,70L51,70L44,66L32,55L22,40L15,25L12,13L6,8L5,8ZM25,22L30,35L37,48L48,58L50,59L56,59L70,52L71,49L52,38L35,27L27,22L25,22ZM160,22L145,31L134,38L119,47L115,51L124,56L131,59L137,59L147,50L152,44L158,32L161,22L160,22Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,432,466)">
                        <path d="M0,0L5,1L9,8L14,34L16,48L16,55L13,56L4,49L-3,42L-6,38L-9,23L-9,7L-4,2L0,0ZM0,7L-3,9L-3,24L0,37L8,45L10,45L8,32L4,8L0,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,605,466)">
                        <path d="M0,0L6,1L11,4L12,6L12,25L9,39L4,45L-4,52L-9,56L-13,54L-11,37L-6,10L-2,1L0,0ZM1,7L-1,9L-6,40L-6,45L-4,45L1,40L5,33L7,21L7,10L6,8L1,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,335,512)">
                        <path d="M0,0L56,0L62,2L69,17L68,21L66,24L63,25L-4,25L-30,24L-33,18L-32,9L-30,5L-28,5L-27,1L0,0ZM-26,5L-28,19L64,19L62,13L58,5L-26,5Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,649,512)">
                        <path d="M0,0L55,0L83,1L88,8L89,11L89,19L86,24L61,25L-7,25L-12,21L-11,13L-5,1L0,0ZM-2,5L-8,19L84,19L82,5L-2,5Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,334,593)">
                        <path d="M0,0L11,1L17,5L20,9L21,18L18,23L11,28L-13,39L-34,45L-41,46L-58,46L-65,42L-66,40L-65,31L-58,23L-50,17L-33,8L-19,3L0,0ZM-2,7L-16,9L-37,16L-53,24L-61,31L-62,37L-59,40L-55,41L-35,40L-18,37L-3,32L10,26L16,22L18,19L18,14L15,11L9,8L-2,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,705,593)">
                        <path d="M0,0L16,2L32,7L48,15L57,21L64,27L67,32L68,38L65,43L60,46L42,46L27,43L10,37L-13,26L-18,22L-19,19L-19,10L-13,3L-9,1L0,0ZM-3,7L-13,11L-16,13L-17,18L-14,23L2,31L22,38L37,40L61,40L63,38L63,32L58,27L49,21L41,17L27,12L12,8L-3,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,633,630)">
                        <path d="M0,0L6,0L12,4L21,15L21,22L15,35L23,49L30,66L32,75L32,89L29,100L24,109L20,114L12,127L3,138L-3,145L-5,146L-16,145L-16,144L-4,143L4,133L12,122L18,113L15,114L4,114L-3,111L-7,108L-11,109L-15,114L-22,114L-31,108L-34,104L-34,97L-29,83L-31,77L-37,65L-42,51L-43,46L-43,28L-39,18L-32,12L-46,15L-53,18L-63,21L-71,26L-79,29L-83,35L-86,44L-87,52L-88,78L-90,79L-90,46L-86,33L-82,27L-75,23L-65,19L-39,10L-28,9L-27,10L-15,12L-9,14L-2,1L0,0ZM3,7L-5,18L-3,22L6,29L10,28L14,20L12,15L5,7L3,7ZM-26,16L-33,20L-36,26L-37,34L-35,50L-27,68L-21,78L-22,84L-26,96L-26,102L-21,106L-16,105L-11,101L-9,97L-5,99L3,105L5,106L14,106L20,102L20,99L10,97L1,90L-5,85L-12,77L-22,63L-29,48L-30,44L-30,29L-25,21L-19,18L-21,16L-26,16ZM-18,24L-23,27L-26,31L-26,42L-22,55L-15,67L-8,76L0,83L7,90L12,92L19,92L25,88L28,81L27,70L21,54L11,38L7,33L-2,26L-7,24L-18,24Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,436,639)">
                        <path d="M0,0L11,1L37,10L51,16L56,21L60,30L62,44L62,61L61,72L60,72L59,61L58,37L55,28L52,21L47,18L39,15L29,10L11,4L1,2L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,476,661)">
                        <path d="M0,0L7,0L13,5L15,10L16,20L16,32L14,51L10,63L6,68L4,69L-5,69L-10,65L-15,51L-16,41L-16,31L-14,19L-10,9L-4,2L0,0ZM1,7L-4,12L-8,20L-10,27L-11,37L-10,52L-6,63L-3,65L2,65L7,57L10,33L10,22L8,9L5,7L1,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,558,661)">
                        <path d="M0,0L9,1L16,8L21,20L22,25L22,49L18,62L13,68L11,69L3,69L-3,64L-7,53L-9,38L-9,12L-6,5L-2,1L0,0ZM1,7L-2,10L-3,17L-3,40L0,58L3,64L10,65L14,60L17,48L17,31L14,18L9,10L6,7L1,7Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,338,684)">
                        <path d="M0,0L2,0L0,6L-9,21L-13,29L-18,44L-20,52L-22,67L-22,103L-21,118L-24,114L-26,94L-26,64L-23,44L-17,26L-7,8L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,700,684)">
                        <path d="M0,0L4,1L13,14L21,30L26,47L28,60L29,69L29,89L27,111L25,117L23,117L25,93L25,73L22,50L17,34L13,24L7,13L0,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,543,713)">
                        <path d="M0,0L1,0L1,43L-1,43L-1,11L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,496,723)">
                        <path d="M0,0L2,0L3,22L2,33L0,32L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,388,743)">
                        <path d="M0,0L3,3L15,19L22,29L24,30L36,31L36,32L25,33L20,30L2,6L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,520,795)">
                        <path d="M0,0L9,3L19,10L27,20L39,41L40,43L37,42L37,40L33,38L28,27L22,19L17,13L9,7L5,6L-5,6L-10,8L-20,17L-25,23L-29,29L-32,37L-38,42L-36,37L-26,19L-18,10L-9,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,280,810)">
                        <path d="M0,0L1,0L1,11L-1,22L-2,22L-1,10L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,323,816)">
                        <path d="M0,0L8,1L9,3L3,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,714,816)">
                        <path d="M0,0L4,1L-3,4L-5,3L-5,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,492,851)">
                        <path d="M0,0L6,1L8,3L-6,3L-4,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,547,851)">
                        <path d="M0,0L8,2L4,3L-6,3L-5,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,814,871)">
                        <path d="M0,0L2,1L2,11L0,7L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,491,959)">
                        <path d="M0,0L6,0L3,2L-7,4L-7,2L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,547,959)">
                        <path d="M0,0L10,2L9,4L0,2L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,390,979)">
                        <path d="M0,0L5,2L12,7L19,10L15,11L2,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,648,979)">
                        <path d="M0,0L2,1L-4,6L-12,11L-18,12L-15,9L-5,4L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,416,993)">
                        <path d="M0,0L5,2L18,8L32,13L42,17L58,23L71,28L84,38L94,45L97,46L112,46L119,42L137,28L158,20L177,13L193,7L207,0L209,1L201,6L186,13L177,17L150,27L138,32L123,45L113,51L96,51L88,47L73,34L63,29L37,19L14,9L2,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,374,1052)">
                        <path d="M0,0L8,6L18,16L28,24L36,31L43,34L43,36L49,38L54,43L49,42L43,38L41,36L34,33L23,24L6,8L0,2L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,665,1052)">
                        <path d="M0,0L2,1L0,4L-2,4L-4,8L-12,16L-23,25L-27,27L-29,31L-35,35L-41,36L-42,39L-50,43L-53,42L-45,37L-40,33L-32,29L-26,24L-21,19L-12,12L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,467,1074)">
                        <path d="M0,0L2,2L10,37L10,46L8,43L2,18L0,7L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,617,1115)">
                        <path d="M0,0L2,2L8,25L12,44L16,59L28,107L33,123L39,136L46,147L49,152L48,154L43,149L34,136L28,123L25,114L19,88L13,63L10,47L7,34L0,5L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,422,1116)">
                        <path d="M0,0L2,0L-2,18L-11,60L-17,86L-25,118L-30,130L-37,142L-45,152L-48,153L-46,148L-37,134L-32,123L-28,112L-13,52L-9,38L-4,13L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,454,1171)">
                        <path d="M0,0L3,1L3,4L1,5L0,10L-1,10L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,584,1171)">
                        <path d="M0,0L3,1L4,9L2,8L1,5L-2,7L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,473,1205)">
                        <path d="M0,0L3,3L7,10L6,12L3,9L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,566,1205)">
                        <path d="M0,0L1,3L-3,11L-6,13L-4,8L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,483,1412)">
                        <path d="M0,0L2,0L3,2L3,75L1,119L-1,120L-1,10L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,325,1825)">
                        <path d="M0,0L25,0L25,3L-3,3L-17,2L-17,1L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(1,0,0,1,691,1825)">
                        <path d="M0,0L24,0L42,1L42,2L27,3L-1,3L0,0Z" style={{ fillRule: 'nonzero', stroke: 'black', strokeWidth: '0.95px' }} />
                    </g>
                    <g transform="matrix(0.625,0,0,0.286957,510.125,484.459)">
                        <path d="M354.2,108.046L359,167.415L209.4,162.188L216.6,108.046L354.2,108.046Z" />
                    </g>
                    <g transform="matrix(0.8,0,0,0.209012,121.242,499.505)">
                        <path d="M343,76.353L348,157.862L231.75,157.862L234.25,76.353L343,76.353Z" />
                    </g>
                </g>
            </g>
        </svg>
    );
}