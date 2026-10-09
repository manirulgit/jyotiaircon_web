import Header from '../header';
import Nabvar from '../navbar';
import './LiveStatus.css';

function LiveStatus() {
    return (
        <div>
            <Header />
            <Nabvar />
           
            <section class="content">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">Current Technician Status</h3>
                    </div>

                    <div class="box-body">
                        <form>
                            <div class="col-md-12 form-line">
                                <div class="table-responsive">
                                    <table id="example2" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Technician Id</th>
                                                <th>Name</th>
                                                <th>Busy</th>
                                                <th>Available</th>
                                                <th>Ready</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>agent4</td>
                                                <td>Agent Four</td>
                                                <td><table class="table table-bordered">
                                                    <tr>
                                                        <td><button type="button" class="btn btn-sm btn-default">BUSY</button></td>
                                                        <td>&nbsp;</td>
                                                        <td>0:7:35</td>
                                                    </tr>
                                                </table></td>
                                                <td><table class="table table-bordered">
                                                    <tr>
                                                        <td><button type="button" class="btn btn-sm btn-success">AVAILABLE</button></td>
                                                        <td>Technician is available and waiting for call</td>
                                                        <td>0:7:35</td>
                                                    </tr>
                                                </table></td>
                                                <td><table class="table table-bordered">
                                                    <tr>
                                                        <td><button type="button" class="btn btn-sm btn-default">READY</button></td>
                                                        <td>Technician is ready and available</td>
                                                        <td>0:7:35</td>
                                                    </tr>
                                                </table></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </div>


    );
}

export default LiveStatus