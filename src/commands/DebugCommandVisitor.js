/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const OutText = require('./OutText');
const VariableBinding = require('../commands/VariableBinding');
const Conditional = require('../commands/Conditional');
const OutputVariable = require('../commands/OutputVariable');

const DebugVisitor = require('../compiler/DebugVisitor');

function expression2text(expression) {
    const v = new DebugVisitor();
    expression.accept(v);
    return v.result;
}

module.exports = class DebugCommandVisitor {

    constructor() {
        this._result = '';
    }

    get result() {
        return this._result;
    }

    visit(cmd) {
        if (cmd instanceof OutText) {
            this._result += `TEXT('${cmd.text}');\n`;
        }
        else if (cmd instanceof VariableBinding.Start) {
            const exp = expression2text(cmd.expression);
            this._result += `VAR.START('${cmd.variableName}', '${exp}')\n`;
        }
        else if (cmd instanceof VariableBinding.End) {
            this._result += `VAR.END()\n`;
        }
        else if (cmd instanceof Conditional.Start) {
            const exp = expression2text(cmd.expectedTruthValue);
            this._result += `COND.START('${cmd.variableName}' == '${exp}')\n`;
        }
        else if (cmd instanceof Conditional.End) {
            this._result += `COND.END()\n`;
        }
        else if (cmd instanceof OutputVariable) {
            this._result += `OUT(${cmd.variableName})\n`;
        }

    }
};

