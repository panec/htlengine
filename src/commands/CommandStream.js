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
const VariableBinding = require('./VariableBinding');
const Conditional = require('./Conditional');
const BooleanConstant = require('../compiler/nodes/BooleanConstant');

const ALWAYS_FALSE_VAR = 'always_false';

module.exports = class CommandStream {

    constructor() {
        this._commands = [];
    }

    write(command) {
        this._commands.push(command);
    }

    close() {

    }

    get commands() {
        return this._commands;
    }

    beginIgnore() {
        this.write(new VariableBinding.Start(ALWAYS_FALSE_VAR, BooleanConstant.FALSE));
        this.write(new Conditional.Start(ALWAYS_FALSE_VAR, BooleanConstant.TRUE));
    }

    endIgnore() {
        this.write(Conditional.END);
        this.write(VariableBinding.END);
    }

};