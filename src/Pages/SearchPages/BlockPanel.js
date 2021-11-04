import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Tab, Table, Tabs } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Formatter from "../../Services/Formatter";
import TimeConverter from "../../Services/TimeConverter";

export default class BlockPanel extends Component {
    generateDetailsCard(data, miner) {
        var block_link = "/search/" + data.block_hash;
        var miner_link = "/search/" + miner;
        return (
            <Container fluid style={{"paddingLeft": "0px", "paddingRight": "0px", "height": "80px"}}>
                <Table>
                    <tbody>
                        <tr>
                            <td class="cell-fit-padding-wide" style={{"borderTop": "none"}}>
                                <FontAwesomeIcon icon={["fas", "cubes"]} size="sm" className="mr-1" fixedWidth/>{"Block"}
                            </td>
                            <td class="cell-fit-no-padding" style={{"borderTop": "none", "width": "100%"}}>
                                <Link to={block_link}>{data.block_hash}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td class="cell-fit-padding-wide" style={{"borderTop": "none"}}>
                                <FontAwesomeIcon icon={["far", "clock"]} size="sm" className="mr-1" fixedWidth/>{"Time"}
                            </td>
                            <td class="cell-fit-no-padding" style={{"borderTop": "none", "width": "100%"}}>
                                {TimeConverter.convertUnixTimestamp(data.time, "full") + " (epoch: " + data.epoch + ")"}
                            </td>
                        </tr>
                        <tr>
                            <td class="cell-fit-padding-wide" style={{"borderTop": "none"}}>
                                <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1" fixedWidth/>{"Miner"}
                            </td>
                            <td class="cell-fit-no-padding" style={{"borderTop": "none", "width": "100%"}}>
                                <Link to={miner_link}>{miner}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td class="cell-fit-padding-wide" style={{"borderTop": "none"}}>
                                <FontAwesomeIcon icon={["fas", "check"]} size="sm" className="mr-1" fixedWidth/>{"Status"}
                            </td>
                            <td class="cell-fit-no-padding" style={{"borderTop": "none", "width": "100%"}}>
                                {data.status}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }

    generateMintCard(mint_txn) {
        var mint_link = "/search/" + mint_txn.txn_hash;
        return (
            <Container fluid style={{"paddingLeft": "0px", "paddingRight": "0px"}}>
                <Table>
                    <thead>
                        <tr>
                            <th class="cell-fit-padding-wide cell-truncate">
                                <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                            </th>
                            <th class="cell-fit-padding-wide cell-truncate">
                                <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Address"}
                            </th>
                            <th class="cell-fit-no-padding" style={{"textAlign": "right"}}>
                                <FontAwesomeIcon icon={["fas", "coins"]} size="sm" className="mr-1"/>{"Output"}
                            </th>
                            <th class="cell-fit-no-padding" style={{"borderTop": "none", "borderBottom": "none"}}>
                                {""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mint_txn.output_values.map(function(output_value, idx){
                                var address_link = "/search/" + mint_txn.output_addresses[idx];
                                return (
                                    <tr>
                                        <td class="cell-fit-padding-wide">
                                            {
                                                idx === 0
                                                    ? <Link to={mint_link}>{mint_txn.txn_hash}</Link>
                                                    : ""
                                            }
                                        </td>
                                        <td class="cell-fit-padding-wide">
                                            <Link to={address_link}>{mint_txn.output_addresses[idx]}</Link>
                                        </td>
                                        <td class="cell-fit-no-padding" style={{"textAlign": "right"}}>
                                            {Formatter.formatWitValue(output_value)}
                                        </td>
                                        <td class="cell-fit-no-padding" style={{"width": "100%", "borderTop": "none"}}>
                                            {""}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }

    generateValueTransferCard(value_transfer_txns) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                        </th>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Source"}
                        </th>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Destination"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["fas", "coins"]} size="sm" className="mr-1"/>{"Value"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["far", "money-bill-alt"]} size="sm" className="mr-1"/>{"Fee"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["fas", "tachometer-alt"]} size="sm" className="mr-1"/>{"Priority"}
                        </th>
                        <th class="cell-fit-no-padding" style={{"textAlign": "center"}}>
                            <FontAwesomeIcon icon={["fas", "lock"]} size="sm" className="mr-1"/>{"Locked"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        value_transfer_txns.map(function(value_transfer){
                            const txn_link = "/search/" + value_transfer.txn_hash;
                            const source_link =
                                value_transfer.unique_input_addresses.length === 1
                                    ? "/search/" + value_transfer.unique_input_addresses[0]
                                    : "";
                            const destination_link =
                                value_transfer.real_output_addresses.length === 1
                                    ? "/search/" + value_transfer.real_output_addresses[0]
                                    : "";

                            return (
                                <tr>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        <Link to={txn_link}>{value_transfer.txn_hash}</Link>
                                    </td>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        {
                                            value_transfer.unique_input_addresses.length === 1
                                                ? <Link to={source_link}>{value_transfer.unique_input_addresses[0]}</Link>
                                                : "(multiple inputs)"
                                        }
                                    </td>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        {
                                            value_transfer.real_output_addresses.length === 1
                                                ? <Link to={destination_link}>{value_transfer.real_output_addresses[0]}</Link>
                                                : "(multiple outputs)"
                                        }
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {Formatter.formatWitValue(value_transfer.value, 2)}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {Formatter.formatWitValue(value_transfer.fee, 2)}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {Formatter.formatValue(value_transfer.priority, 0)}
                                    </td>
                                    <td class="cell-fit-no-padding" style={{"textAlign": "center"}}>
                                        {
                                            value_transfer.timelocked === true
                                                ? <FontAwesomeIcon icon={["fas", "lock"]} size="sm"/>
                                                : <FontAwesomeIcon icon={["fas", "unlock"]} size="sm"/>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }

    generateDataRequestCard(data_request_txns) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                        </th>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Requester"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["far", "handshake"]} size="sm" className="mr-1"/>{"Collateral"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                            <FontAwesomeIcon icon={["fas", "percentage"]} size="sm" className="mr-1"/>{"Consensus"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["fas", "search"]} size="sm" className="mr-1"/>{"Witnesses"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["fas", "trophy"]} size="sm" className="mr-1"/>{"Reward"}
                        </th>
                        <th class="cell-fit-no-padding" style={{"textAlign": "right"}}>
                            <FontAwesomeIcon icon={["far", "money-bill-alt"]} size="sm" className="mr-1"/>{"Total fee"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data_request_txns.map(function(data_request_txn){
                            const txn_link = "/search/" + data_request_txn.txn_hash;
                            const requester_link =
                                data_request_txn.unique_input_addresses.length === 1
                                    ? "/search/" + data_request_txn.unique_input_addresses[0]
                                    : "";

                            return (
                                <tr>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "40%"}}>
                                        <Link to={txn_link}>{data_request_txn.txn_hash}</Link>
                                    </td>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        {
                                            data_request_txn.unique_input_addresses.length === 1
                                                ? <Link to={requester_link}>{data_request_txn.unique_input_addresses[0]}</Link>
                                                : "(multiple requesters)"
                                        }
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {Formatter.formatWitValue(data_request_txn.collateral, 2)}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                                        {data_request_txn.consensus_percentage + "%"}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {data_request_txn.witnesses}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "right"}}>
                                        {Formatter.formatWitValue(data_request_txn.witness_reward, 2)}
                                    </td>
                                    <td class="cell-fit-no-padding" style={{"textAlign": "right"}}>
                                        {Formatter.formatWitValue(data_request_txn.fee, 2)}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }

    generateCommitCard(commit_txns) {
        return (
            <Table responsive>
                <tbody>
                    {
                        Object.keys(commit_txns).map(function(key){
                            var collateral = commit_txns[key]["collateral"];
                            var txn_addresses = commit_txns[key]["txn_address"];
                            var txn_hashes = commit_txns[key]["txn_hash"];

                            var data_request_link = <Link to={"/search/" + key}>{key}</Link>;

                            return ([
                                <tr>
                                    <td class="no-border no-padding" colspan="3">
                                        {"Commits for data request "}
                                        {data_request_link}
                                        {" requiring "}
                                        {Formatter.formatWitValue(collateral, 2)}
                                        {" collateral"}
                                    </td>
                                </tr>,
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            <th class="cell-fit padding-horizontal-wide">
                                                <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                                            </th>
                                            <th class="cell-fit-padding-wide">
                                                <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Committer"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            txn_hashes.map(function(txn_hash, idx) {
                                                const commit_txn_link = "/search/" + txn_hash;
                                                const committer_link = "/search/" + txn_addresses[idx];

                                                return (
                                                    <tr>
                                                        <td class="cell-fit padding-horizontal-wide cell-truncate" style={{"width": "45%"}}>
                                                            <Link to={commit_txn_link}>{txn_hash}</Link>
                                                        </td>
                                                        <td class="cell-fit-padding-wide cell-truncate" style={{"width": "45%"}}>
                                                            <Link to={committer_link}>{txn_addresses[idx]}</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            ]);
                        })
                    }
                </tbody>
            </Table>
        );
    }

    generateRevealCard(reveal_txns) {
        return (
            <Table responsive>
                <tbody>
                    {
                        Object.keys(reveal_txns).map(function(key){
                            var successes = reveal_txns[key]["success"];
                            var txn_hashes = reveal_txns[key]["txn_hash"];
                            var txn_addresses = reveal_txns[key]["txn_address"];
                            var reveal_translations = reveal_txns[key]["reveal_translation"];

                            var data_request_link = <Link to={"/search/" + key}>{key}</Link>;

                            return ([
                                <tr>
                                    <td class="no-border no-padding" colspan="5">
                                        {"Reveals for data request "}
                                        {data_request_link}
                                    </td>
                                </tr>,
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            <th class="cell-fit padding-horizontal-wide" style={{"textAlign": "center"}}>
                                                <FontAwesomeIcon icon={["fas", "check"]} size="sm" className="mr-1"/>{"Success"}
                                            </th>
                                            <th class="cell-fit-padding-wide">
                                                <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                                            </th>
                                            <th class="cell-fit-padding-wide">
                                                <FontAwesomeIcon icon={["fas", "user"]} size="sm" className="mr-1"/>{"Revealer"}
                                            </th>
                                            <th class="cell-fit-no-padding">
                                                <FontAwesomeIcon icon={["fas", "trophy"]} size="sm" className="mr-1"/>{"Result"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            txn_hashes.map(function(txn_hash, idx) {
                                                const reveal_txn_link = "/search/" + txn_hash;
                                                const revealer_link = "/search/" + txn_addresses[idx];

                                                return (
                                                    <tr>
                                                        <td class="cell-fit padding-horizontal-wide" style={{"textAlign": "center"}}>
                                                            {
                                                                successes[idx] === 1
                                                                    ? <FontAwesomeIcon icon={["fas", "check"]} size="sm"/>
                                                                    : <FontAwesomeIcon icon={["fas", "times"]} size="sm"/>
                                                            }
                                                        </td>
                                                        <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                                            <Link to={reveal_txn_link}>{txn_hash}</Link>
                                                        </td>
                                                        <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                                            <Link to={revealer_link}>{txn_addresses[idx]}</Link>
                                                        </td>
                                                        <td class="cell-fit-no-padding cell-truncate" style={{"width": "35%"}}>
                                                            {reveal_translations[idx]}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            ]);
                        })
                    }
                </tbody>
            </Table>
        );
    }

    generateTallyCard(tally_txns) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                            <FontAwesomeIcon icon={["far", "check"]} size="sm" className="mr-1"/>{"Success"}
                        </th>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Transaction"}
                        </th>
                        <th class="cell-fit-padding-wide">
                            <FontAwesomeIcon icon={["fas", "align-justify"]} size="sm" className="mr-1"/>{"Data request"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                            <FontAwesomeIcon icon={["fas", "times"]} size="sm" className="mr-1"/>{"Errors"}
                        </th>
                        <th class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                            <FontAwesomeIcon icon={["fas", "bolt"]} size="sm" className="mr-1"/>{"Liars"}
                        </th>
                        <th class="cell-fit-no-padding">
                            <FontAwesomeIcon icon={["far", "eye"]} size="sm" className="mr-1"/>{"Result"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tally_txns.map(function(tally_txn){
                            const tally_txn_link = "/search/" + tally_txn.txn_hash;
                            const data_request_txn_link = "/search/" + tally_txn.data_request_txn_hash;

                            return (
                                <tr>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                                        {
                                            tally_txn.success === true
                                                ? <FontAwesomeIcon icon={["fas", "check"]} size="sm"/>
                                                : <FontAwesomeIcon icon={["fas", "times"]} size="sm"/>
                                        }
                                    </td>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        <Link to={tally_txn_link}>{tally_txn.txn_hash}</Link>
                                    </td>
                                    <td class="cell-fit-padding-wide cell-truncate" style={{"width": "30%"}}>
                                        <Link to={data_request_txn_link}>{tally_txn.data_request_txn_hash}</Link>
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                                        {tally_txn.num_error_addresses}
                                    </td>
                                    <td class="cell-fit-padding-wide" style={{"textAlign": "center"}}>
                                        {tally_txn.num_liar_addresses}
                                    </td>
                                    <td class="cell-fit-no-padding cell-truncate" style={{"width": "20%"}}>
                                        {tally_txn.tally_translation}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }

    render() {
        var value_transfer_tab_title = this.props.data.value_transfer_txns.length === 1
            ? this.props.data.value_transfer_txns.length + " value transfer"
            : this.props.data.value_transfer_txns.length + " value transfers";
        var data_request_tab_title = this.props.data.data_request_txns.length === 1
            ? this.props.data.data_request_txns.length + " data request"
            : this.props.data.data_request_txns.length + " data requests";
        var commit_tab_title = this.props.data.number_of_commits === 1
            ? this.props.data.number_of_commits + " commit"
            : this.props.data.number_of_commits + " commits";
        var reveal_tab_title = this.props.data.number_of_reveals === 1
            ? this.props.data.number_of_reveals + " reveal"
            : this.props.data.number_of_reveals + " reveals";
        var tally_tab_title = this.props.data.tally_txns.length === 1
            ? this.props.data.tally_txns.length + " tally"
            : this.props.data.tally_txns.length + " tallies";

        return (
            <Container fluid style={{"padding": "0px"}}>
                <Card className="w-100 shadow p-1 mb-3 bg-white rounded">
                    <Card.Body className="p-1">
                        <Card.Text>
                            {this.generateDetailsCard(this.props.data.details, this.props.data.mint_txn.miner)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="w-100 shadow p-1 mb-3 bg-white rounded">
                    <Card.Body className="p-1">
                        <Card.Text>
                            <Tabs defaultActiveKey="mint" id="uncontrolled-tab-example" style={{"paddingLeft": "1rem", "paddingBottom": "1rem"}}>
                                <Tab eventKey="mint" title="Mint">
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateMintCard(this.props.data.mint_txn)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                                <Tab eventKey="value_transfer" title={value_transfer_tab_title}>
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateValueTransferCard(this.props.data.value_transfer_txns)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                                <Tab eventKey="data_request" title={data_request_tab_title}>
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateDataRequestCard(this.props.data.data_request_txns)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                                <Tab eventKey="commit" title={commit_tab_title}>
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateCommitCard(this.props.data.commit_txns)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                                <Tab eventKey="reveal" title={reveal_tab_title}>
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateRevealCard(this.props.data.reveal_txns)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                                <Tab eventKey="tally" title={tally_tab_title}>
                                    <Scrollbars hideTracksWhenNotNeeded autoHeight autoHeightMin={"55vh"} autoHeightMax={"55vh"}>
                                        <Container fluid>
                                            {this.generateTallyCard(this.props.data.tally_txns)}
                                        </Container>
                                    </Scrollbars>
                                </Tab>
                            </Tabs>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}
