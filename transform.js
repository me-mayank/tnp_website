const fs = require('fs');
const file = 'd:/Web Dev 2/TP/components/PlacementSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const rightSidePattern = /          \{\/\* Right Side - Graph\/Chart \*\/}\r?\n([\s\S]*?)          <\/div>\r?\n        <\/div>\r?\n      <\/div>\r?\n    <\/section>/;

const match = content.match(rightSidePattern);
if (!match) {
  console.log('Graph not found');
  process.exit(1);
}

const graphCode = match[1].trimEnd();

// Insert renderGraphContainer before return
const renderFunc = \n  const renderGraphContainer = () => (\n\n  );\n\n  return (;
content = content.replace('  return (', renderFunc);

// Replace Right Side with function call
const newRightSide =           {/* Right Side - Graph/Chart */}
          <div className="hidden lg:block h-full">
            {renderGraphContainer()}
          </div>;
content = content.replace(rightSidePattern, newRightSide + '\n        </div>\n      </div>\n    </section>');

// Replace map start
content = content.replace(
  '            {stats.map((stat, index) => (\n              <div\n                key={index}',
  '            {stats.map((stat, index) => (\n              <React.Fragment key={index}>\n                <div'
);

// Replace map end
const mapEnd =                   <h5 className="text-[12px] md:text-[13px] font-black text-white uppercase tracking-normal leading-none">{stat.label}</h5>
                </div>
              </div>
            ))};

const newMapEnd =                   <h5 className="text-[12px] md:text-[13px] font-black text-white uppercase tracking-normal leading-none">{stat.label}</h5>
                </div>
              </div>

              {/* Mobile Graph Container */}
              {activeCard === index && (
                <div className="block lg:hidden w-full mt-2 animate-in slide-in-from-top-4 fade-in duration-300">
                  {renderGraphContainer()}
                </div>
              )}
              </React.Fragment>
            ))};

content = content.replace(mapEnd, newMapEnd);

fs.writeFileSync(file, content);
console.log('Success');
